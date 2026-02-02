# ⚙️ 커스터마이징 가이드

이 문서는 사회복지현장실습 관리 시스템을 귀 기관에 맞게 수정하는 방법을 안내합니다.

---

## 📍 필수 변경 항목

### 1. Code.gs - 기관 설정

파일 상단의 `ORG_CONFIG`와 `CONFIG` 객체를 수정하세요.

```javascript
// ============================================================
// ⚠️ 기관 설정 - 반드시 수정하세요!
// ============================================================

const ORG_CONFIG = {
  // 기관명 (출석부, 이메일, 서식 등에 표시)
  ORG_NAME: '○○종합사회복지관',
  
  // 상위 기관명 (법인명)
  ORG_PARENT: '사회복지법인 ○○재단',
  
  // 기관 주소
  ORG_ADDRESS: '서울시 ○○구 ○○로 123',
  
  // 전화번호
  ORG_TEL: '02-123-4567',
  
  // 관장 이름 (서약서 등에 표시)
  ORG_DIRECTOR: '홍길동',
  
  // 부서 목록 (부서 배정 시 선택 옵션)
  DEPARTMENTS: ['사례관리팀', '서비스제공팀', '지역조직화팀', '경영지원팀'],
  
  // 슈퍼바이저 이메일 도메인
  // 이 도메인의 이메일만 슈퍼바이저 앱 접근 가능
  SUPERVISOR_DOMAIN: 'yourorg.or.kr',
  
  // 관리자 이메일 (오류 알림 수신)
  ADMIN_EMAIL: 'admin@yourorg.or.kr'
};

const CONFIG = {
  // ⚠️ 스프레드시트 ID (필수!)
  // Google 스프레드시트 URL에서 복사
  // https://docs.google.com/spreadsheets/d/[이 부분]/edit
  SPREADSHEET_ID: '여기에_ID_붙여넣기',
  
  // 파일 저장 폴더 ID (선택사항, 빈 문자열이면 자동 생성)
  ROOT_FOLDER_ID: '',
  
  // 슈퍼바이저 도메인
  SUPERVISOR_DOMAIN: ORG_CONFIG.SUPERVISOR_DOMAIN
};

// 테스트 계정 (개발/테스트 시에만 사용)
// 운영 환경에서는 빈 배열로 설정: const TEST_ACCOUNTS = [];
const TEST_ACCOUNTS = ['test@gmail.com'];
```

---

## 🎨 선택 변경 항목

### 2. StudentApp.html - 실습생 앱 UI

#### 앱 제목 변경
```html
<!-- 헤더의 로고 텍스트 -->
<span>사회복지현장실습</span>

<!-- 로그인 모달 -->
<p style="color: #64748b; font-size: 0.9rem;">○○종합사회복지관</p>
```

#### 색상 테마 변경
CSS 변수를 수정하여 색상을 변경할 수 있습니다:
```css
:root {
  --primary: #2563eb;      /* 메인 색상 (파란색) */
  --primary-dark: #1d4ed8; /* 메인 색상 (어두운) */
  --success: #10b981;      /* 성공 (초록색) */
  --warning: #f59e0b;      /* 경고 (주황색) */
  --danger: #ef4444;       /* 위험 (빨간색) */
}
```

### 3. SupervisorApp.html - 슈퍼바이저 앱 UI

실습생 앱과 동일한 방식으로 수정 가능합니다.

---

## 📝 기관별 서식 변경

### 실습서약서 양식 수정
`Code.gs`의 `getFormTemplates()` 함수에서 서약서 내용을 수정할 수 있습니다.

### 출석부 PDF 양식 수정
`Code.gs`의 `generateAttendanceReport()` 함수에서 PDF 레이아웃을 수정할 수 있습니다.

### 신청서 PDF 양식 수정
`Code.gs`의 `submitApplication()` 함수 내 HTML 생성 부분을 수정합니다.

---

## 🔍 검색으로 찾기

특정 텍스트를 변경하려면 Code.gs에서 검색(Ctrl+F)하여 찾습니다:

| 검색어 | 설명 |
|--------|------|
| `신림종합사회복지관` | 기관명 |
| `학교법인일송학원` | 상위 법인명 |
| `난곡로 110` | 주소 |
| `851-1767` | 전화번호 |
| `sillym.or.kr` | 슈퍼바이저 도메인 |
| `관장 최 성 숙` | 관장 이름 (서약서) |

---

## 📊 부서 목록 변경

`Code.gs`의 `DEPARTMENTS` 상수를 수정합니다:

```javascript
// 기본값
const DEPARTMENTS = ['마을이음1팀', '마을이음2팀', '마을이음3팀', '어르신돌봄팀'];

// 귀 기관에 맞게 변경
const DEPARTMENTS = ['사례관리팀', '서비스제공팀', '지역조직화팀', '경영지원팀'];
```

---

## 📧 이메일 템플릿 변경

이메일 내용은 `Code.gs`에서 `MailApp.sendEmail()` 함수 호출 부분을 검색하여 수정합니다.

### 주요 이메일 발송 위치:
- `submitApplication()` - 신청 접수 완료 메일
- `processFirstSelection()` - 1차 합격 안내 메일
- `processFinalSelection()` - 최종 합격 안내 메일
- `submitFeedback()` - 과제 피드백 알림 메일

---

## ✅ 변경 후 체크리스트

- [ ] 스프레드시트 ID 변경
- [ ] 기관명 변경
- [ ] 주소 및 연락처 변경
- [ ] 슈퍼바이저 도메인 변경
- [ ] 부서 목록 변경
- [ ] 관장 이름 변경 (서약서)
- [ ] 테스트 계정 설정/제거
- [ ] 새 버전으로 배포
- [ ] 기능 테스트

---

## 🔄 버전 업데이트

코드 수정 후:

1. Apps Script 편집기에서 저장
2. **배포** → **배포 관리** → **수정** (✏️)
3. **버전**: 새 버전
4. **배포**

> ⚠️ URL은 변경되지 않습니다. 기존 URL 그대로 사용 가능합니다.

---

## 💡 팁

### 로컬에서 백업하기
정기적으로 Code.gs, StudentApp.html, SupervisorApp.html 파일을 로컬에 백업해 두세요.

### 테스트 환경 분리
운영용과 별도로 테스트용 스프레드시트를 만들어 테스트하는 것을 권장합니다.

### 변경 이력 관리
Apps Script 편집기의 **버전 기록**에서 이전 버전을 확인할 수 있습니다.
