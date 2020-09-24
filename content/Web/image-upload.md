+++
category = Web
comments = true
date = "20200924"
draft = false
showpagemeta = true
showcomments = true
slug = ""
tags = [ "spring image upload", "image rendering", "react", "spring"]
title = "[Spring][React]이미지 업로드 기능 만들기"
description = "게시판 글 이미지 업로드 기능 만들기!"
front = true
+++

지금 하고 있는 프로젝트인 '거북이 스터디'에 글을 쓸 때 이미지 업로드 기능을 만들고 싶었다.

어떻게 이미지를 업로드할 수 있을까?

일단, facebook에서 이미지를 어떻게 업로드하는지 살펴보았다.

## 이미지를 업로드하는 과정

과정을 간단하게 살펴보면,

1. 사용자가 이미지 파일을 업로드 한다.
2. 업로드한 파일을 서버에 저장한다.
3. 클라이언트에서는 서버에 저장된 이미지의 url을 가져와서 사용한다.

### 페이스북이 피드에 이미지를 업로드 하는 요청 보기

- Form Data를 POST 요청 보내면, 서버에 저장된 이미지 주소를 Response로 받는다.

- request header

![request header](https://user-images.githubusercontent.com/36990926/94120109-b68f2d80-fe8a-11ea-931f-ddee89de0538.png)

- response

![response ](https://user-images.githubusercontent.com/36990926/94120111-b858f100-fe8a-11ea-9bb7-7f95657de379.png)

---

## Spring 서버 이미지 업로드 API 만들기

1. 이미지 데이터베이스 테이블 추가해주기

```java
-- schema.sql

CREATE TABLE image
(
    id      bigint primary key auto_increment,
    name    varchar(512),
    type    varchar(128),
    pic_byte MEDIUMBLOB
);
```

2. image upload API 추가하기

- [MultipartFile](<[https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/multipart/MultipartFile.html](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/multipart/MultipartFile.html)>) 인터페이스는 멀티 파트 요청에서 받은 업로드된 파일의 표현이다.
- 파일 내용은 메모리에 저장되거나 디스크에 임시 저장된다.
- [Deflater](<[https://docs.oracle.com/javase/8/docs/api/java/util/zip/Deflater.html](https://docs.oracle.com/javase/8/docs/api/java/util/zip/Deflater.html)>)는 문자열을 압축한다.

- 압축한 byte를 데이터 베이스에 저장한다.
- 저장된 이미지의 id를 Response 메시지에 반환한다.

```java
@RestController
public class FileUploadController {

    FileService fileService;

    public FileUploadController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/images")
    public Long uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        Image image = new Image(file.getOriginalFilename(), file.getContentType(), compressBytes(file.getBytes()));
        return fileService.addImage(image);
    }

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);

            try {
                outputStream.close();
            } catch (IOException e) {
            }
        }
        return outputStream.toByteArray();
    }
}
```

```java
@Service
public class FileService {
    ImageRepository imageRepository;

    public FileService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Long addImage (Image image) {
        return imageRepository.addImage(image);
    }
}
```

```java
@Repository
public class ImageRepository {
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public ImageRepository(DataSource dataSource) {
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    public Long addImage(Image image) {
        String sql = "INSERT INTO image (name, type, pic_byte) VALUES ( :name, :type, :picByte )";
        SqlParameterSource parameter = new MapSqlParameterSource("name", image.getName())
                .addValue("type", image.getType())
                .addValue("picByte", image.getPicByte());

        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(sql, parameter, keyHolder);
        return keyHolder.getKey().longValue();
    }
}
```

## Spring 서버 이미지 가져오는 API

- 프로젝트에서 저장된 이미지를 가져온다.
- 압축을 풀어서 응답 바디에 넣어준다.
- 이 때 Content-Type 을 저장했던 image의 타입으로 해준다.
- Content-Type 을 지정해주지 않으면, 브라우저에서 파싱할 때 이미지 형식으로 파싱을 해주지 않는다.

```java
@GetMapping("/images/{id}")
    public byte[] getImage(@PathVariable Long id, HttpServletResponse response) {
        Image image = fileService.getImageById(id);
        image.setPicByte(decompressBytes(image.getPicByte()));
        response.setContentType(image.getType());

        return image.getPicByte();
    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException ignored) {
        }

        return outputStream.toByteArray();
    }

```

```java
public Image getImageById(Long id) {
        return imageRepository.findById(id).orElseThrow();
    }
```

```java
public Optional<Image> findById(Long id) {
        String sql = "SELECT id, name, type, pic_byte FROM image WHERE id = :id";
        SqlParameterSource parameter = new MapSqlParameterSource("id", id);
        try {
            Image image = namedParameterJdbcTemplate.queryForObject(sql, parameter, BeanPropertyRowMapper.newInstance(Image.class));
            assert image != null;
            return Optional.of(image);

        } catch (Exception e) {
            return Optional.empty();
        }
    }
```

---

## 클라이언트에서 이미지 렌더링하기

이제 이 이미지를 클라이언트에서 어떻게 렌더링해주면 좋을까?

서버에 게시글을 어떤 형식으로 저장했느냐에 따라 차이가 있을 것 같다.

서버에 게시글을 html 형식으로 저장을 할 수 있고, 자신이 정한 특정한 형식(마크다운같은)으로 저장할 수도 있다.

텍스트를 저장한 형식에 맞게 HTML로 파싱해주면 된다.

이번 프로젝트에서는 마크다운 형식으로 저장을 하고, 마크다운형식으로 작성한 텍스트를 HTML로 파싱하여 렌더링하였다.

### markdown을 html로 변환하기

[react-markdown](<[https://github.com/rexxars/react-markdown](https://github.com/rexxars/react-markdown)>) 라이브러리를 사용하여 마크다운을 html로 파싱해주었다.

코드 highlighter 기능도 추가해줬다.

```js
import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'

export const MarkdownToHtml = ({ source }: string | any) => {
  return <ReactMarkdown source={source} renderers={{ code: CodeBlock }} />
}
```

```js
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={tomorrow}>
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
```

### 이미지 업로드 fetch 요청 보내기

이미지 업로드 요청을 보낸 뒤 이미지 id를 받아온 뒤 content 에 이미지를 마크다운 형식으로 추가해준다.

```js
const onUploadImage = async e => {
  const formData = new FormData()
  if (e.target.files !== null) {
    formData.append('imageFile', e.target.files[0])

    const requestOptions: RequestInit = {
      method: 'POST',
      credentials: 'include',
      body: formData
    }

    const imageId = await fetch(
      `${process.env.REACT_APP_BASE_URL}/images`,
      requestOptions
    ).then(response => response.json())

    const imgSrc = `${process.env.REACT_APP_BASE_URL}/images/${imageId}`

    // 현재 작성중인 content에 업로드한 이미지의 주소를 추가해줌
    onChangeContent(PostInput.content, `${content}\n![](${imgSrc}) \n`)
  }
}
```

## 완성된 이미지

![](https://user-images.githubusercontent.com/36990926/94119970-88a9e900-fe8a-11ea-93e1-a19b8d4d0b9d.png)

![](https://user-images.githubusercontent.com/36990926/94119977-8b0c4300-fe8a-11ea-81fa-289efeb185b6.png)

![](https://user-images.githubusercontent.com/36990926/94119981-8c3d7000-fe8a-11ea-93c9-1f16b07a2764.png)

## 개선할 점

image는 데이터가 크기 때문에 이미지를 배포 서버에 직접 저장하는 것이 아니라, AWS s3같은 서비스를 사용하여 s3 서버에 저장한 후에 배포 서버에서는 content에 이미지 url만 저장하면 좋을 것 같다.

## 참고자료

[https://spring.io/guides/gs/uploading-files/](https://spring.io/guides/gs/uploading-files/)

[https://medium.com/@rameez.s.shaikh/upload-and-retrieve-images-using-spring-boot-angular-8-mysql-18c166f7bc98](https://medium.com/@rameez.s.shaikh/upload-and-retrieve-images-using-spring-boot-angular-8-mysql-18c166f7bc98)
