# 📋 사회복지현장실습 관리 시스템

사회복지기관의 현장실습을 체계적으로 관리하기 위한 Google Apps Script 기반 웹 애플리케이션입니다.

## ✨ 주요 기능

### 실습생 앱
- 📝 실습 신청서 작성 및 제출
- 📢 합격자 공지 확인
- ⏰ 출퇴근 체크 (위치 기반)
- 📄 실습서식 다운로드
- 📤 과제 제출 (WYSIWYG 에디터)
- 📊 만족도 조사

### 슈퍼바이저 앱
- 👥 신청자 관리 및 채점
- ✅ 합격자 선정 (1차/2차)
- 🏢 부서 배정
- 📋 출석 현황 관리
- 📑 과제 확인 및 피드백
- ⚙️ 시스템 설정

---

## 🚀 설치 방법

### 1단계: Google 스프레드시트 생성

1. [Google Drive](https://drive.google.com)에서 새 스프레드시트 생성
2. 스프레드시트 이름: `사회복지현장실습_데이터` (원하는 이름)
3. URL에서 **스프레드시트 ID** 복사
   ```
   https://docs.google.com/spreadsheets/d/[이 부분이 ID]/edit
   ```

### 2단계: Apps Script 프로젝트 생성

1. 스프레드시트에서 **확장 프로그램** → **Apps Script** 클릭
2. 프로젝트 이름을 `사회복지현장실습`으로 변경

### 3단계: 파일 추가

기본 `Code.gs` 파일 외에 HTML 파일 2개를 추가합니다:

1. **+** 버튼 → **HTML** 선택 → `StudentApp` 입력
2. **+** 버튼 → **HTML** 선택 → `SupervisorApp` 입력

### 4단계: 코드 붙여넣기

| 파일 | 내용 |
|------|------|
| `Code.gs` | `Code.gs` 파일 전체 내용 |
| `StudentApp.html` | `StudentApp.html` 파일 전체 내용 |
| `SupervisorApp.html` | `SupervisorApp.html` 파일 전체 내용 |

### 5단계: 기관 설정 변경

`Code.gs` 파일 상단의 **ORG_CONFIG** 섹션을 귀 기관에 맞게 수정하세요:

```javascript
const ORG_CONFIG = {
  // 기관 정보
  ORG_NAME: '○○종합사회복지관',        // 기관명
  ORG_PARENT: '사회복지법인 ○○재단',    // 상위 기관명
  ORG_ADDRESS: '서울시 ○○구 ○○로 123', // 주소
  ORG_TEL: '02-123-4567',               // 전화번호
  ORG_DIRECTOR: '홍길동',               // 관장 이름
  
  // 부서 목록
  DEPARTMENTS: ['1팀', '2팀', '3팀'],
  
  // 슈퍼바이저 도메인 (이메일의 @ 뒷부분)
  SUPERVISOR_DOMAIN: 'example.or.kr',
  
  // 관리자 이메일
  ADMIN_EMAIL: 'admin@example.or.kr'
};

const CONFIG = {
  // 새로 만든 스프레드시트 ID로 변경
  SPREADSHEET_ID: '여기에_스프레드시트_ID_붙여넣기',
  
  // 파일 저장용 폴더 ID (선택사항)
  ROOT_FOLDER_ID: '',
  
  // 슈퍼바이저 도메인
  SUPERVISOR_DOMAIN: ORG_CONFIG.SUPERVISOR_DOMAIN
};

// 테스트 계정 (개발 중에만 사용, 운영 시 빈 배열로)
const TEST_ACCOUNTS = [];
```

### 6단계: appsscript.json 설정

1. **프로젝트 설정** (⚙️) 클릭
2. **"appsscript.json" 매니페스트 파일을 편집기에 표시** 체크
3. `appsscript.json` 파일을 다음과 같이 수정:

```json
{
  "timeZone": "Asia/Seoul",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE"
  },
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/script.send_mail",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}
```

### 7단계: 시스템 초기화

1. Apps Script 편집기에서 함수 선택: `initializeSystem`
2. **실행** 버튼 클릭
3. 권한 승인 (최초 1회)
4. 스프레드시트에 시트들이 자동 생성됨 확인

### 8단계: 웹앱 배포

1. **배포** → **새 배포**
2. **유형 선택** → ⚙️ → **웹 앱**
3. 설정:
   - 설명: `v1.0 초기 배포`
   - 다음 사용자로 실행: `나`
   - 액세스 권한: `모든 사용자`
4. **배포** 클릭
5. **웹 앱 URL** 복사

---

## 🔗 앱 접속 URL

배포 후 생성된 URL을 사용합니다:

| 앱 | URL |
|----|-----|
| 실습생 앱 | `https://script.google.com/macros/s/[배포ID]/exec` |
| 슈퍼바이저 앱 | `https://script.google.com/macros/s/[배포ID]/exec?app=supervisor` |

---

## ⚙️ 초기 설정 (슈퍼바이저 앱)

1. 슈퍼바이저 앱 접속
2. **설정** 탭 이동
3. 다음 항목 설정:
   - 연도
   - 모집 기간 (시작일/종료일)
   - 실습 기간 (시작일/종료일)
   - 합격자 로그인 기간
   - 실습분야 목록
   - 앱 활성화 체크

---

## 📁 파일 구조

```
📦 social-work-practicum/
├── 📄 Code.gs              # 서버 측 코드 (Google Apps Script)
├── 📄 StudentApp.html      # 실습생 앱 UI
├── 📄 SupervisorApp.html   # 슈퍼바이저 앱 UI
├── 📄 appsscript.json      # 프로젝트 설정
├── 📄 README.md            # 설치 가이드 (이 파일)
└── 📄 CONFIG_GUIDE.md      # 커스터마이징 가이드
```

---

## 🔧 문제 해결

### 권한 오류 발생 시
- Google 계정으로 로그인 상태인지 확인
- 앱 권한 승인이 완료되었는지 확인

### 데이터가 안 보일 때
- 스프레드시트 ID가 올바른지 확인
- `initializeSystem` 함수가 실행되었는지 확인

### 이메일 발송 실패 시
- Gmail 일일 발송 한도 확인 (무료 계정: 100통/일)
- 스팸 폴더 확인

---

## 📞 기술 지원

문의사항이 있으시면 이슈를 등록해 주세요.

---

## 📜 라이선스

MIT License

---

## 🙏 기여

Pull Request와 Issue를 환영합니다!
