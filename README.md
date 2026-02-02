# 사회복지현장실습 관리시스템

Google Apps Script 기반의 사회복지현장실습 관리 웹앱입니다.

## 주요 기능

### 실습생 앱
- 📝 실습 신청서 작성 및 제출
- 📋 합격자 공지 확인
- 🔐 최종합격자/슈퍼바이저 로그인
- ✍️ 최종합격자 정보 입력
- 📢 실습 안내 공지사항
- ⏰ 위치 기반 출퇴근 기록
- 📂 실습 서식 다운로드
- 📤 과제 제출
- 📊 만족도 조사

### 슈퍼바이저 앱
- ⚙️ 실습 기간 설정
- 👥 슈퍼바이저 관리
- 📄 신청서 관리 및 채점
- 🏆 합격자 관리 (1차/최종)
- 📑 출석부 PDF 생성
- 📝 공지사항 및 실습서식 관리
- ✅ 과제 확인 및 피드백
- 📈 만족도 조사 결과

## 설치 방법

### 1. Google 스프레드시트 생성

1. [Google 스프레드시트](https://sheets.google.com)에서 새 스프레드시트 생성
2. URL에서 스프레드시트 ID 복사
   ```
   https://docs.google.com/spreadsheets/d/[이 부분이 ID]/edit
   ```

### 2. Apps Script 프로젝트 생성

1. 스프레드시트에서 **확장 프로그램** → **Apps Script** 클릭
2. 기본 `Code.gs` 파일 내용 삭제
3. 이 저장소의 파일들을 추가:
   - `Code.gs` - 서버 코드
   - `StudentApp.html` - 실습생 앱 UI
   - `SupervisorApp.html` - 슈퍼바이저 앱 UI

### 3. 기관 설정 수정

`Code.gs` 상단의 `ORG_CONFIG`를 귀 기관에 맞게 수정:

```javascript
const ORG_CONFIG = {
  ORG_NAME: '○○종합사회복지관',           // 기관명
  ORG_PARENT: '사회복지법인 ○○재단',       // 상위 기관명
  ORG_ADDRESS: '서울시 ○○구 ○○로 123',   // 주소
  ORG_TEL: '02-123-4567',                  // 전화번호
  ORG_DIRECTOR: '홍길동',                   // 관장 이름
  DEPARTMENTS: ['1팀', '2팀', '3팀'],      // 부서 목록
  SUPERVISOR_DOMAIN: 'example.or.kr',      // 이메일 도메인
  ADMIN_EMAIL: 'admin@example.or.kr'       // 관리자 이메일
};
```

### 4. 스프레드시트 ID 설정

`CONFIG.SPREADSHEET_ID`를 1단계에서 복사한 ID로 변경:

```javascript
const CONFIG = {
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE',  // ← 여기에 붙여넣기
  // ...
};
```

### 5. 시스템 초기화

1. Apps Script 편집기에서 `initializeSystem` 함수 선택
2. **실행** 버튼 클릭
3. Google 권한 승인 (처음 한 번만)

### 6. 웹앱 배포

1. **배포** → **새 배포**
2. 유형: **웹 앱** 선택
3. 설정:
   - 설명: `v1.0.0`
   - 실행 계정: **나**
   - 액세스 권한: **모든 사용자**
4. **배포** 클릭
5. 웹앱 URL 복사

### 7. 첫 슈퍼바이저 등록

스프레드시트의 **슈퍼바이저** 시트에 직접 추가:

| ID | 이름 | 부서 | 직위 | 이메일 | 비밀번호 | 활성화 |
|----|------|------|------|--------|----------|--------|
| SV001 | 홍길동 | 1팀 | 팀장 | admin@example.or.kr | 1234 | TRUE |

## 사용 방법

### URL 구조

- 실습생 앱: `웹앱URL`
- 슈퍼바이저 앱: `웹앱URL?app=supervisor`

### 로그인 방법

**실습생 (최종합격자)**
- 이메일: 신청서에 입력한 이메일
- 비밀번호: 휴대폰 번호 뒷자리 4자리

**슈퍼바이저**
- 이메일: 슈퍼바이저 시트에 등록된 이메일
- 비밀번호: 슈퍼바이저 시트에 등록된 비밀번호

## 폴더 구조

```
social-work-practicum/
├── Code.gs              # 서버 코드 (설정 포함)
├── StudentApp.html      # 실습생 앱 UI
├── SupervisorApp.html   # 슈퍼바이저 앱 UI
├── appsscript.json      # 프로젝트 설정
├── README.md            # 설치 가이드
└── CONFIG_GUIDE.md      # 상세 설정 가이드
```

## 업데이트 방법

1. Apps Script 편집기에서 파일 내용 업데이트
2. **배포** → **배포 관리** → **수정** (✏️)
3. **새 버전** 선택 → **배포**

## 라이선스

MIT License

## 문의

이슈나 개선 사항은 GitHub Issues를 통해 제보해 주세요.
