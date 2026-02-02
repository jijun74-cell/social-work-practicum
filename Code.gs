// ============================================================
// ⚠️ 기관 설정 - 아래 항목들을 귀 기관에 맞게 수정하세요!
// ============================================================

const ORG_CONFIG = {
  // 기관 정보 (출석부 PDF, 이메일, 서식 등에 표시됨)
  ORG_NAME: '○○종합사회복지관',           // 기관명
  ORG_PARENT: '사회복지법인 ○○재단',       // 상위 기관/법인명
  ORG_ADDRESS: '서울시 ○○구 ○○로 123',   // 주소
  ORG_TEL: '02-123-4567',                  // 전화번호
  ORG_DIRECTOR: '홍길동',                   // 관장 이름 (서약서 등에 사용)
  
  // 부서 목록 (부서 배정 시 선택 옵션)
  DEPARTMENTS: ['1팀', '2팀', '3팀', '4팀'],
  
  // 슈퍼바이저 이메일 도메인 (@ 뒷부분)
  SUPERVISOR_DOMAIN: 'example.or.kr',
  
  // 관리자 이메일 (시스템 알림 수신)
  ADMIN_EMAIL: 'admin@example.or.kr'
};

// ============================================================
// 시스템 설정 - 스프레드시트 ID는 반드시 변경하세요!
// ============================================================

const CONFIG = {
  // ⚠️ 새로 만든 스프레드시트의 ID로 변경하세요!
  // URL에서 복사: https://docs.google.com/spreadsheets/d/[이 부분]/edit
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE',
  
  // 파일 저장 폴더 ID (선택사항, 빈 문자열이면 자동 생성)
  ROOT_FOLDER_ID: '',
  
  // 슈퍼바이저 도메인 (위의 ORG_CONFIG에서 가져옴)
  SUPERVISOR_DOMAIN: ORG_CONFIG.SUPERVISOR_DOMAIN
};

// 부서 목록 (ORG_CONFIG에서 가져옴)
const DEPARTMENTS = ORG_CONFIG.DEPARTMENTS;

// 테스트 계정 (개발/테스트 시에만 사용, 운영 환경에서는 빈 배열로)
const TEST_ACCOUNTS = [];

// ============================================================
// 아래부터는 수정하지 않아도 됩니다
// ============================================================

const SHEETS = {
  SETTINGS: '설정',
  APPLICATIONS: '실습신청',
  APPLICANTS: '신청자정보',
  SCORING: '채점',
  PASSED_STUDENTS: '합격자',
  FINAL_INFO: '최종합격자정보',
  ATTENDANCE: '출석부',
  NOTICES: '공지사항',
  FORMS: '실습서식',
  SUBMISSIONS: '과제제출',
  SATISFACTION: '만족도조사',
  LOGS: '로그',
  PRIVACY_CONSENT: '개인정보동의',
  SUPERVISOR_CONSENT: '슈퍼바이저동의',
  SUPERVISORS: '슈퍼바이저'
};

const HEADERS = {
  '설정': ['연도', '모집시작일', '모집종료일', '실습시작일', '실습종료일', '앱활성화', '합격자공개', '만족도활성화', '실습분야', '합격자로그인시작', '합격자로그인종료', '생성일'],
  '실습신청': ['ID', '연도', '신청일시', '이름', '생년월일', '성별', '연락처', '이메일', '주소', '학교', '학과', '학년', '학번', '실습지원분야', '실습동기', '자기소개', '자원봉사경험', '이전실습경험', '특기사항', '신청서파일ID', '상태', '1차합격', '2차합격', '배정부서'],
  '신청자정보': ['ID', '연도', '이름', '연락처', '이메일', '학교', '학과', '실습지원분야', '신청일시'],
  '채점': ['ID', '신청ID', '연도', '채점단계', '채점자이메일', '채점자이름', '채점일시', '항목1점수', '항목2점수', '항목3점수', '항목4점수', '항목5점수', '총점', '의견'],
  '합격자': ['ID', '연도', '신청ID', '이름', '연락처마지막4자리', '합격단계', '공지일시'],
  '최종합격자정보': ['ID', '연도', '신청ID', '이름', '주민등록번호', '학교', '학과', '지도교수', '공문수신이메일', '배정부서', '담당슈퍼바이저', '비고', '등록일시', '개인정보동의'],
  '출석부': ['ID', '연도', '이메일', '이름', '날짜', '출근시간', '퇴근시간', '출근주소', '퇴근주소'],
  '공지사항': ['ID', '제목', '내용', '대상', '작성자', '작성일', '파일ID', '파일명', '조회수'],
  '실습서식': ['ID', '서식명', '유형', '설명', '파일ID', '파일명', '등록자', '등록일', '다운로드수'],
  '과제제출': ['ID', '연도', '이메일', '이름', '유형', '제목', '내용', '파일ID', '파일명', '슈퍼바이저', '제출일시', '확인여부', '피드백', '피드백일시'],
  '만족도조사': ['ID', '연도', '제출일시', 'UUID', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'positive', 'improvement', 'other'],
  '로그': ['ID', '일시', '사용자', '액션', '상세', '비고'],
  '개인정보동의': ['ID', '이메일', '이름', '동의일시', '유형', '역할'],
  '슈퍼바이저동의': ['ID', '이메일', '동의일시', '비고'],
  '슈퍼바이저': ['ID', '이름', '부서', '직위', '이메일', '비밀번호', '활성화']
};

// ==================== 웹앱 진입점 ====================
function doGet(e) {
  const app = e.parameter.app || 'student';
  
  if (app === 'supervisor') {
    // 슈퍼바이저 앱: 앱 내부에서 자체 로그인으로 처리
    return HtmlService.createTemplateFromFile('SupervisorApp')
      .evaluate()
      .setTitle('사회복지현장실습 관리 - 슈퍼바이저')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  return HtmlService.createTemplateFromFile('StudentApp')
    .evaluate()
    .setTitle('사회복지현장실습 관리 - 실습생')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ==================== 유틸리티 함수 ====================
// 안전하게 이메일 가져오기 (실제 로그인 사용자만)
function getEmail() {
  try {
    // getActiveUser만 사용 (실제 로그인한 사용자)
    // getEffectiveUser는 배포자 이메일을 반환할 수 있어 사용하지 않음
    const email = Session.getActiveUser().getEmail();
    return email || '';
  } catch (e) {
    console.error('getEmail error:', e);
    return '';
  }
}

function isTestAccount(email) {
  if (!email) return false;
  return TEST_ACCOUNTS.includes(email.toLowerCase());
}

function isSupervisor(email) {
  if (!email) return false;
  if (isTestAccount(email)) return true;
  if (!email.endsWith('@' + CONFIG.SUPERVISOR_DOMAIN)) return false;
  
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEETS.SUPERVISORS);
    if (sheet) {
      const data = sheet.getDataRange().getValues();
      if (data.length > 1) {
        const headers = data[0];
        const emailIdx = headers.indexOf('이메일');
        const activeIdx = headers.indexOf('활성화');
        for (let i = 1; i < data.length; i++) {
          if (data[i][emailIdx] === email) {
            if (activeIdx >= 0) {
              return data[i][activeIdx] === true || data[i][activeIdx] === 'TRUE';
            }
            return true;
          }
        }
        return true;
      }
    }
  } catch (e) {
    console.log('isSupervisor check error:', e);
  }
  return true;
}

function getCurrentUser() {
  try {
    const email = getEmail();
    if (!email) {
      console.log('getCurrentUser - no email found');
      return { email: '', isSupervisor: false, isTestAccount: false };
    }
    return { email: email, isSupervisor: isSupervisor(email), isTestAccount: isTestAccount(email) };
  } catch (error) {
    console.error('getCurrentUser error:', error);
    return { email: '', isSupervisor: false, isTestAccount: false };
  }
}

function generateId() { return Utilities.getUuid().substring(0, 13); }

function formatDate(date) {
  if (!date) return '';
  return Utilities.formatDate(date, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
}

function formatDateOnly(date) {
  if (!date) return '';
  if (date instanceof Date) return Utilities.formatDate(date, 'Asia/Seoul', 'yyyy-MM-dd');
  return String(date);
}

function formatTime(date) {
  if (!date) return '';
  return Utilities.formatDate(date, 'Asia/Seoul', 'HH:mm');
}

// ==================== 시트 관리 ====================
function getSheet(sheetName, createIfNotExists) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet && createIfNotExists) {
      sheet = ss.insertSheet(sheetName);
      const headers = HEADERS[sheetName];
      if (headers && headers.length > 0) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      }
    }
    return sheet;
  } catch (error) {
    console.error('getSheet error for', sheetName, ':', error);
    return null;
  }
}

function getSheetData(sheetName) {
  try {
    const sheet = getSheet(sheetName, true);
    if (!sheet) {
      console.log('getSheetData - sheet not found:', sheetName);
      return { headers: [], data: [], headerIndex: {}, sheet: null };
    }
    const allData = sheet.getDataRange().getValues();
    console.log('getSheetData -', sheetName, '- rows:', allData.length);
    if (allData.length === 0) return { headers: [], data: [], headerIndex: {}, sheet: sheet };
    const headers = allData[0];
    const data = allData.slice(1);
    const headerIndex = {};
    // 헤더 인덱스 생성 시 trim 적용
    headers.forEach((h, idx) => { 
      if (h) {
        const trimmed = String(h).trim();
        headerIndex[trimmed] = idx;
      }
    });
    console.log('getSheetData -', sheetName, '- headerIndex:', JSON.stringify(headerIndex));
    return { headers, data, headerIndex, sheet };
  } catch (error) {
    console.error('getSheetData error for', sheetName, ':', error);
    return { headers: [], data: [], headerIndex: {}, sheet: null };
  }
}

function rowToObject(row, headers) {
  const obj = {};
  headers.forEach((h, idx) => {
    let value = row[idx];
    if (value instanceof Date) value = formatDate(value);
    obj[h] = value;
  });
  return obj;
}

function initializeSystem() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  Object.keys(HEADERS).forEach(sheetName => {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      const headers = HEADERS[sheetName];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
  });
  return { success: true, message: '시스템 초기화 완료' };
}
// ==================== 설정 관리 ====================
function getSettings(year) {
  try {
    const targetYear = year || new Date().getFullYear();
    console.log('getSettings - targetYear:', targetYear, 'type:', typeof targetYear);
    
    const { data, headerIndex } = getSheetData(SHEETS.SETTINGS);
    console.log('getSettings - data length:', data ? data.length : 0);
    
    // 수정: headerIndex['연도']가 0일 수 있으므로 undefined 체크
    if (!data || data.length === 0 || headerIndex['연도'] === undefined) {
      console.log('getSettings - no data or no 연도 header');
      return { year: targetYear, recruitStart: '', recruitEnd: '', practiceStart: '', practiceEnd: '', appActive: false, resultsPublic: false, satisfactionActive: false, practiceFields: '', loginStart: '', loginEnd: '' };
    }
    
    for (let i = 0; i < data.length; i++) {
      const rowYear = data[i][headerIndex['연도']];
      
      if (rowYear == targetYear) {
        const recruitStart = data[i][headerIndex['모집시작일']];
        const recruitEnd = data[i][headerIndex['모집종료일']];
        const practiceStart = data[i][headerIndex['실습시작일']];
        const practiceEnd = data[i][headerIndex['실습종료일']];
        const practiceFieldsValue = data[i][headerIndex['실습분야']];
        const loginStart = data[i][headerIndex['합격자로그인시작']];
        const loginEnd = data[i][headerIndex['합격자로그인종료']];
        
        return {
          year: rowYear,
          recruitStart: recruitStart instanceof Date ? formatDateOnly(recruitStart) : (recruitStart || ''),
          recruitEnd: recruitEnd instanceof Date ? formatDateOnly(recruitEnd) : (recruitEnd || ''),
          practiceStart: practiceStart instanceof Date ? formatDateOnly(practiceStart) : (practiceStart || ''),
          practiceEnd: practiceEnd instanceof Date ? formatDateOnly(practiceEnd) : (practiceEnd || ''),
          appActive: data[i][headerIndex['앱활성화']] === true || data[i][headerIndex['앱활성화']] === 'TRUE',
          resultsPublic: data[i][headerIndex['합격자공개']] === true || data[i][headerIndex['합격자공개']] === 'TRUE',
          satisfactionActive: data[i][headerIndex['만족도활성화']] === true || data[i][headerIndex['만족도활성화']] === 'TRUE',
          practiceFields: practiceFieldsValue || '',
          loginStart: loginStart instanceof Date ? formatDateOnly(loginStart) : (loginStart || ''),
          loginEnd: loginEnd instanceof Date ? formatDateOnly(loginEnd) : (loginEnd || '')
        };
      }
    }
    console.log('getSettings - year not found, returning defaults');
    return { year: targetYear, recruitStart: '', recruitEnd: '', practiceStart: '', practiceEnd: '', appActive: false, resultsPublic: false, satisfactionActive: false, practiceFields: '', loginStart: '', loginEnd: '' };
  } catch (error) {
    console.error('getSettings ERROR:', error);
    return { year: new Date().getFullYear(), recruitStart: '', recruitEnd: '', practiceStart: '', practiceEnd: '', appActive: false, resultsPublic: false, satisfactionActive: false, practiceFields: '', loginStart: '', loginEnd: '' };
  }
}

function saveSettings(settings) {
  
  const sheet = getSheet(SHEETS.SETTINGS, true);
  const { data, headerIndex } = getSheetData(SHEETS.SETTINGS);
  let rowIndex = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['연도']] == settings.year) { rowIndex = i + 2; break; }
  }
  // 헤더 순서: 연도, 모집시작일, 모집종료일, 실습시작일, 실습종료일, 앱활성화, 합격자공개, 만족도활성화, 실습분야, 합격자로그인시작, 합격자로그인종료, 생성일
  const rowData = [settings.year, settings.recruitStart, settings.recruitEnd, settings.practiceStart, settings.practiceEnd, settings.appActive, settings.resultsPublic, settings.satisfactionActive || false, settings.practiceFields || '', settings.loginStart || '', settings.loginEnd || '', rowIndex > 0 ? data[rowIndex - 2][headerIndex['생성일']] : formatDate(new Date())];
  if (rowIndex > 0) sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
  else sheet.appendRow(rowData);
  return { success: true };
}

function isRecruitmentPeriod() {
  try {
    if (isTestAccount(Session.getActiveUser().getEmail())) return true;
    const settings = getSettings();
    if (!settings.appActive || !settings.recruitStart || !settings.recruitEnd) return false;
    const now = new Date();
    const start = new Date(settings.recruitStart);
    const end = new Date(settings.recruitEnd);
    end.setHours(23, 59, 59);
    return now >= start && now <= end;
  } catch (error) { return false; }
}

function isPracticePeriod() {
  try {
    if (isTestAccount(Session.getActiveUser().getEmail())) return true;
    const settings = getSettings();
    if (!settings.appActive || !settings.practiceStart || !settings.practiceEnd) return false;
    const now = new Date();
    const start = new Date(settings.practiceStart);
    const end = new Date(settings.practiceEnd);
    end.setHours(23, 59, 59);
    return now >= start && now <= end;
  } catch (error) { return false; }
}

function isLoginPeriod() {
  try {
    const settings = getSettings();
    if (!settings.loginStart || !settings.loginEnd) return false;
    const now = new Date();
    const start = new Date(settings.loginStart);
    const end = new Date(settings.loginEnd);
    end.setHours(23, 59, 59);
    return now >= start && now <= end;
  } catch (error) { return false; }
}

// ==================== 실습생 로그인 ====================
function loginStudent(email, password) {
  try {
    if (!email || !password) {
      return { success: false, message: '이메일과 비밀번호를 입력해주세요.' };
    }
    
    // 1. 먼저 슈퍼바이저인지 확인
    const svData = getSheetData(SHEETS.SUPERVISORS);
    for (let i = 0; i < svData.data.length; i++) {
      if (svData.data[i][svData.headerIndex['이메일']] === email) {
        const isActive = svData.data[i][svData.headerIndex['활성화']] === true || 
                         svData.data[i][svData.headerIndex['활성화']] === 'TRUE';
        if (!isActive) {
          return { success: false, message: '비활성화된 계정입니다.' };
        }
        const storedPassword = String(svData.data[i][svData.headerIndex['비밀번호']] || '');
        if (storedPassword === password) {
          const name = svData.data[i][svData.headerIndex['이름']];
          console.log('loginStudent (supervisor) success:', email, name);
          return { 
            success: true, 
            email: email,
            name: name,
            status: '최종합격',  // 슈퍼바이저는 최종합격자와 동일한 권한
            isSupervisor: true,
            message: '슈퍼바이저 로그인 성공'
          };
        } else {
          return { success: false, message: '비밀번호가 일치하지 않습니다.' };
        }
      }
    }
    
    // 2. 슈퍼바이저가 아니면 최종합격자 확인
    const { data, headerIndex } = getSheetData(SHEETS.APPLICATIONS);
    const currentYear = new Date().getFullYear();
    
    // 이메일로 신청 정보 찾기
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i][headerIndex['이메일']] === email && data[i][headerIndex['연도']] == currentYear) {
        // 휴대폰 번호에서 뒷자리 4자리 추출
        const phone = String(data[i][headerIndex['연락처']] || '').replace(/[^0-9]/g, '');
        const phoneLast4 = phone.slice(-4);
        
        if (phoneLast4 === password) {
          const status = data[i][headerIndex['상태']];
          const name = data[i][headerIndex['이름']];
          console.log('loginStudent success:', email, name, status);
          return { 
            success: true, 
            email: email,
            name: name,
            status: status,
            isSupervisor: false,
            message: '로그인 성공'
          };
        } else {
          return { success: false, message: '비밀번호가 일치하지 않습니다.' };
        }
      }
    }
    
    return { success: false, message: '등록된 정보가 없습니다.\n최종합격자 또는 슈퍼바이저만 로그인할 수 있습니다.' };
  } catch (error) {
    console.error('loginStudent error:', error);
    return { success: false, message: '로그인 중 오류가 발생했습니다.' };
  }
}

// ==================== 슈퍼바이저 로그인 ====================
function loginSupervisor(email, password) {
  try {
    if (!email || !password) {
      return { success: false, message: '이메일과 비밀번호를 입력해주세요.' };
    }
    
    const { data, headerIndex } = getSheetData(SHEETS.SUPERVISORS);
    
    // 이메일로 슈퍼바이저 찾기
    for (let i = 0; i < data.length; i++) {
      if (data[i][headerIndex['이메일']] === email) {
        // 활성화 여부 확인
        const isActive = data[i][headerIndex['활성화']] === true || data[i][headerIndex['활성화']] === 'TRUE';
        if (!isActive) {
          return { success: false, message: '비활성화된 계정입니다.\n관리자에게 문의하세요.' };
        }
        
        // 비밀번호 확인
        const storedPassword = String(data[i][headerIndex['비밀번호']] || '');
        if (storedPassword === password) {
          const name = data[i][headerIndex['이름']];
          const department = data[i][headerIndex['부서']] || '';
          const position = data[i][headerIndex['직위']] || '';
          
          console.log('loginSupervisor success:', email, name);
          return { 
            success: true, 
            email: email,
            name: name,
            department: department,
            position: position,
            message: '로그인 성공'
          };
        } else {
          return { success: false, message: '비밀번호가 일치하지 않습니다.' };
        }
      }
    }
    
    return { success: false, message: '등록된 슈퍼바이저가 아닙니다.\n관리자에게 문의하세요.' };
  } catch (error) {
    console.error('loginSupervisor error:', error);
    return { success: false, message: '로그인 중 오류가 발생했습니다.' };
  }
}

// 슈퍼바이저 권한 확인 (로그인된 이메일로)
function checkSupervisorAuth(supervisorEmail) {
  if (!supervisorEmail) return false;
  
  try {
    const { data, headerIndex } = getSheetData(SHEETS.SUPERVISORS);
    for (let i = 0; i < data.length; i++) {
      if (data[i][headerIndex['이메일']] === supervisorEmail) {
        const isActive = data[i][headerIndex['활성화']] === true || data[i][headerIndex['활성화']] === 'TRUE';
        return isActive;
      }
    }
    return false;
  } catch (error) {
    console.error('checkSupervisorAuth error:', error);
    return false;
  }
}

// 로그인된 실습생의 앱 상태 조회
function getAppStatusForStudent(studentEmail) {
  try {
    const settings = getSettings();
    
    // 로그인한 이메일로 신청 상태 확인
    let userApplicationStatus = null;
    let userName = null;
    
    if (studentEmail) {
      const { data, headerIndex } = getSheetData(SHEETS.APPLICATIONS);
      const currentYear = new Date().getFullYear();
      
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i][headerIndex['이메일']] === studentEmail && data[i][headerIndex['연도']] == currentYear) {
          userApplicationStatus = data[i][headerIndex['상태']];
          userName = data[i][headerIndex['이름']];
          break;
        }
      }
    }
    
    return { 
      user: { email: studentEmail, name: userName },
      settings: settings, 
      isRecruitmentPeriod: isRecruitmentPeriod(), 
      isPracticePeriod: isPracticePeriod(), 
      isLoginPeriod: isLoginPeriod(),
      isTestMode: false,
      userApplicationStatus: userApplicationStatus
    };
  } catch (error) {
    console.error('getAppStatusForStudent error:', error);
    return { 
      user: { email: studentEmail }, 
      settings: { year: new Date().getFullYear(), appActive: false, resultsPublic: false, satisfactionActive: false, practiceFields: '', loginStart: '', loginEnd: '' }, 
      isRecruitmentPeriod: false, 
      isPracticePeriod: false, 
      isLoginPeriod: false,
      isTestMode: false,
      userApplicationStatus: null
    };
  }
}

// 로그인된 실습생의 신청 상태 조회
function getMyApplicationStatusByEmail(studentEmail) {
  if (!studentEmail) return null;
  
  const { data, headerIndex } = getSheetData(SHEETS.APPLICATIONS);
  const currentYear = new Date().getFullYear();
  
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][headerIndex['이메일']] === studentEmail && data[i][headerIndex['연도']] == currentYear) {
      return { 
        id: data[i][headerIndex['ID']], 
        status: data[i][headerIndex['상태']], 
        firstPass: data[i][headerIndex['1차합격']], 
        secondPass: data[i][headerIndex['2차합격']], 
        name: data[i][headerIndex['이름']], 
        appliedDate: data[i][headerIndex['신청일시']] 
      };
    }
  }
  return null;
}

function getAppStatus() {
  try {
    const settings = getSettings();
    
    // 실습생 앱: 자체 로그인 시스템 사용
    // isTestMode는 항상 false (로그인된 이메일로 별도 체크)
    return { 
      user: { email: '' }, 
      settings: settings, 
      isRecruitmentPeriod: isRecruitmentPeriod(), 
      isPracticePeriod: isPracticePeriod(), 
      isLoginPeriod: isLoginPeriod(),
      isTestMode: false,  // 실습생 앱에서는 자체 로그인으로 처리
      userApplicationStatus: null
    };
  } catch (error) {
    console.error('getAppStatus error:', error);
    return { 
      user: { email: '' }, 
      settings: { year: new Date().getFullYear(), appActive: false, resultsPublic: false, satisfactionActive: false, practiceFields: '', loginStart: '', loginEnd: '' }, 
      isRecruitmentPeriod: false, 
      isPracticePeriod: false, 
      isLoginPeriod: false,
      isTestMode: false,
      userApplicationStatus: null
    };
  }
}

// ==================== 개인정보 동의 ====================
function checkPrivacyConsent(type) {
  const email = Session.getActiveUser().getEmail();
  const { data, headerIndex } = getSheetData(SHEETS.PRIVACY_CONSENT);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['이메일']] === email && data[i][headerIndex['유형']] === type) {
      const consentDate = new Date(data[i][headerIndex['동의일시']]);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return consentDate > oneYearAgo;
    }
  }
  return false;
}

function savePrivacyConsent(type) {
  const email = Session.getActiveUser().getEmail();
  const sheet = getSheet(SHEETS.PRIVACY_CONSENT, true);
  sheet.appendRow([generateId(), email, email.split('@')[0], formatDate(new Date()), type, isSupervisor(email) ? '슈퍼바이저' : '실습생']);
  return { success: true };
}

function checkSupervisorConsent() {
  const email = Session.getActiveUser().getEmail();
  const { data, headerIndex } = getSheetData(SHEETS.SUPERVISOR_CONSENT);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['이메일']] === email) {
      const consentDate = new Date(data[i][headerIndex['동의일시']]);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return consentDate > oneYearAgo;
    }
  }
  return false;
}

function saveSupervisorConsent() {
  const email = Session.getActiveUser().getEmail();
  const sheet = getSheet(SHEETS.SUPERVISOR_CONSENT, true);
  sheet.appendRow([generateId(), email, formatDate(new Date()), '']);
  return { success: true };
}
// ==================== 신청 관련 ====================
function submitApplication(formData) {
  if (!isRecruitmentPeriod()) return { success: false, message: '현재 신청 기간이 아닙니다.' };
  const email = Session.getActiveUser().getEmail();
  const sheet = getSheet(SHEETS.APPLICATIONS, true);
  const currentYear = new Date().getFullYear();
  const id = generateId();
  let pdfFileId = '';
  try { pdfFileId = createApplicationPDF(id, formData); } catch (e) { console.error('PDF 생성 실패:', e); }
  sheet.appendRow([id, currentYear, formatDate(new Date()), formData.name, formData.birthDate, formData.gender, formData.phone, formData.email || email, formData.address, formData.school, formData.department, formData.grade, formData.studentId, formData.practiceField, formData.motivation, formData.introduction, formData.volunteerExperience || '', formData.previousPractice || '', formData.specialNote || '', pdfFileId, '접수완료', '', '', '']);
  const applicantSheet = getSheet(SHEETS.APPLICANTS, true);
  applicantSheet.appendRow([id, currentYear, formData.name, formData.phone, formData.email || email, formData.school, formData.department, formData.practiceField, formatDate(new Date())]);
  try { sendApplicationConfirmEmail(formData.email || email, formData.name); } catch (e) { console.error('이메일 발송 실패:', e); }
  logAction('신청서제출', { id: id, name: formData.name });
  return { success: true, message: '신청이 완료되었습니다.' };
}

function createApplicationPDF(id, formData) {
  const html = '<html><head><meta charset="UTF-8"><style>body{font-family:"Malgun Gothic",sans-serif;padding:40px}h1{text-align:center;border-bottom:2px solid #333;padding-bottom:10px}h2{background:#f0f0f0;padding:10px;margin-top:30px}table{width:100%;border-collapse:collapse;margin:20px 0}th,td{border:1px solid #333;padding:10px;text-align:left}th{background:#e0e0e0;width:150px}.section{margin:20px 0;white-space:pre-wrap}.footer{text-align:center;margin-top:50px;color:#666}</style></head><body><h1>사회복지현장실습 신청서</h1><p style="text-align:right">신청일: '+formatDate(new Date())+'</p><h2>개인정보</h2><table><tr><th>성명</th><td>'+formData.name+'</td><th>생년월일</th><td>'+formData.birthDate+'</td></tr><tr><th>성별</th><td>'+formData.gender+'</td><th>연락처</th><td>'+formData.phone+'</td></tr><tr><th>이메일</th><td colspan="3">'+formData.email+'</td></tr><tr><th>주소</th><td colspan="3">'+formData.address+'</td></tr></table><h2>학교정보</h2><table><tr><th>학교</th><td>'+formData.school+'</td><th>학과</th><td>'+formData.department+'</td></tr><tr><th>학년</th><td>'+formData.grade+'</td><th>학번</th><td>'+formData.studentId+'</td></tr></table><h2>실습지원분야</h2><div class="section">'+formData.practiceField+'</div><h2>실습동기</h2><div class="section">'+formData.motivation+'</div><h2>자기소개</h2><div class="section">'+formData.introduction+'</div><h2>자원봉사 경험</h2><div class="section">'+(formData.volunteerExperience||'없음')+'</div><h2>이전 실습 경험</h2><div class="section">'+(formData.previousPractice||'없음')+'</div><h2>특기사항</h2><div class="section">'+(formData.specialNote||'없음')+'</div><div class="footer"><p>'+ORG_CONFIG.ORG_NAME+'</p><p>신청번호: '+id+'</p></div></body></html>';
  const blob = Utilities.newBlob(html, 'text/html', 'application.html');
  const pdfBlob = blob.getAs('application/pdf');
  pdfBlob.setName('실습신청서_'+formData.name+'_'+formatDateOnly(new Date())+'.pdf');
  const rootFolder = DriveApp.getFolderById(CONFIG.ROOT_FOLDER_ID);
  const yearFolders = rootFolder.getFoldersByName(String(new Date().getFullYear()));
  let targetFolder;
  if (yearFolders.hasNext()) {
    const yearFolder = yearFolders.next();
    const appFolders = yearFolder.getFoldersByName('신청서');
    targetFolder = appFolders.hasNext() ? appFolders.next() : yearFolder.createFolder('신청서');
  } else {
    const newYearFolder = rootFolder.createFolder(String(new Date().getFullYear()));
    targetFolder = newYearFolder.createFolder('신청서');
  }
  const file = targetFolder.createFile(pdfBlob);
  return file.getId();
}

function sendApplicationConfirmEmail(email, name) {
  try {
    MailApp.sendEmail(email, '['+ORG_CONFIG.ORG_NAME+'] 사회복지현장실습 신청 접수 완료', '안녕하세요, '+name+'님.\n\n사회복지현장실습 신청이 정상적으로 접수되었습니다.\n\n심사 결과는 별도 안내 예정입니다.\n문의사항이 있으시면 복지관으로 연락해 주세요.\n\n감사합니다.\n\n'+ORG_CONFIG.ORG_NAME+' 드림');
  } catch (e) { console.error('이메일 발송 실패:', e); }
}

function getMyApplicationStatus() {
  const email = Session.getActiveUser().getEmail();
  const { data, headerIndex } = getSheetData(SHEETS.APPLICATIONS);
  const currentYear = new Date().getFullYear();
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][headerIndex['이메일']] === email && data[i][headerIndex['연도']] == currentYear) {
      return { id: data[i][headerIndex['ID']], status: data[i][headerIndex['상태']], firstPass: data[i][headerIndex['1차합격']], secondPass: data[i][headerIndex['2차합격']], name: data[i][headerIndex['이름']], appliedDate: data[i][headerIndex['신청일시']] };
    }
  }
  return null;
}

function getApplications(year, status) {
  try {
    // 자체 로그인 시스템 사용으로 권한 체크 생략
    const { data, headers, headerIndex } = getSheetData(SHEETS.APPLICATIONS);
    if (data.length === 0) return [];
    const results = [];
    for (let i = 0; i < data.length; i++) {
      const rowId = data[i][headerIndex['ID']];
      if (!rowId) continue;
      const rowYear = data[i][headerIndex['연도']];
      const rowStatus = data[i][headerIndex['상태']];
      const yearMatch = !year || String(rowYear) === String(year);
      const statusMatch = !status || rowStatus === status;
      if (yearMatch && statusMatch) results.push(rowToObject(data[i], headers));
    }
    return results;
  } catch (error) {
    console.error('getApplications ERROR:', error);
    return [];
  }
}
// ==================== 채점 ====================
function getScoring(applicationId) {
  const { data, headerIndex } = getSheetData(SHEETS.SCORING);
  const results = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['신청ID']] === applicationId) {
      results.push({ id: data[i][headerIndex['ID']], stage: data[i][headerIndex['채점단계']], scorerEmail: data[i][headerIndex['채점자이메일']], scorerName: data[i][headerIndex['채점자이름']], scoredAt: data[i][headerIndex['채점일시']], scores: [data[i][headerIndex['항목1점수']], data[i][headerIndex['항목2점수']], data[i][headerIndex['항목3점수']], data[i][headerIndex['항목4점수']], data[i][headerIndex['항목5점수']]], total: data[i][headerIndex['총점']], comment: data[i][headerIndex['의견']] });
    }
  }
  return results;
}

function submitScoring(applicationId, stage, scores, comment) {
  const email = Session.getActiveUser().getEmail();
  
  const sheet = getSheet(SHEETS.SCORING, true);
  const total = scores.reduce((a, b) => a + b, 0);
  sheet.appendRow([generateId(), applicationId, new Date().getFullYear(), stage, email, email.split('@')[0], formatDate(new Date()), scores[0]||0, scores[1]||0, scores[2]||0, scores[3]||0, scores[4]||0, total, comment||'']);
  logAction('채점', { applicationId: applicationId, stage: stage, total: total });
  return { success: true };
}

function getAverageScores(applicationId) {
  const scorings = getScoring(applicationId);
  const result = { '1차': { scores: [], average: 0, count: 0 }, '2차': { scores: [], average: 0, count: 0 } };
  scorings.forEach(s => { const stage = s.stage; if (result[stage]) { result[stage].scores.push(s.total); result[stage].count++; } });
  for (let stage in result) { if (result[stage].count > 0) result[stage].average = result[stage].scores.reduce((a, b) => a + b, 0) / result[stage].count; }
  return result;
}

// 전체 채점 이력 가져오기 (모든 슈퍼바이저)
function getMyScoringHistory(year) {
  const email = Session.getActiveUser().getEmail();
  
  
  const { data: scoringData, headerIndex: scoringHeader } = getSheetData(SHEETS.SCORING);
  const { data: appData, headerIndex: appHeader } = getSheetData(SHEETS.APPLICATIONS);
  
  const results = [];
  for (let i = 0; i < scoringData.length; i++) {
    // 연도 필터링 (있는 경우)
    if (year && scoringData[i][scoringHeader['연도']] != year) continue;
    
    const appId = scoringData[i][scoringHeader['신청ID']];
    const scorerEmail = scoringData[i][scoringHeader['채점자이메일']] || '';
    const scorerName = scoringData[i][scoringHeader['채점자이름']] || scorerEmail.split('@')[0] || '-';
    
    // 신청자 정보 찾기
    let applicantName = '-';
    let school = '-';
    for (let j = 0; j < appData.length; j++) {
      if (appData[j][appHeader['ID']] === appId) {
        applicantName = appData[j][appHeader['이름']] || '-';
        school = appData[j][appHeader['학교']] || '-';
        break;
      }
    }
    
    results.push({
      applicationId: appId,
      applicantName: applicantName,
      school: school,
      stage: scoringData[i][scoringHeader['채점단계']],
      scorerName: scorerName,
      scorerEmail: scorerEmail,
      isMyScore: scorerEmail === email,
      scores: [
        scoringData[i][scoringHeader['항목1점수']] || 0,
        scoringData[i][scoringHeader['항목2점수']] || 0,
        scoringData[i][scoringHeader['항목3점수']] || 0,
        scoringData[i][scoringHeader['항목4점수']] || 0,
        scoringData[i][scoringHeader['항목5점수']] || 0
      ],
      total: scoringData[i][scoringHeader['총점']] || 0,
      comment: scoringData[i][scoringHeader['의견']] || '',
      scoredDate: scoringData[i][scoringHeader['채점일시']] ? formatDateOnly(new Date(scoringData[i][scoringHeader['채점일시']])) : '-'
    });
  }
  
  // 최근 순 정렬
  return results.reverse();
}

// ==================== 합격자 관리 ====================
function setPassStatus(applicationId, stage, pass) {
  const email = Session.getActiveUser().getEmail();
  
  const { data, headerIndex, sheet } = getSheetData(SHEETS.APPLICATIONS);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['ID']] === applicationId) {
      const rowNum = i + 2;
      if (stage === '1차') {
        sheet.getRange(rowNum, headerIndex['상태'] + 1).setValue(pass ? '1차합격' : '불합격');
        sheet.getRange(rowNum, headerIndex['1차합격'] + 1).setValue(pass ? '합격' : '불합격');
      } else if (stage === '2차') {
        sheet.getRange(rowNum, headerIndex['상태'] + 1).setValue(pass ? '최종합격' : '불합격');
        sheet.getRange(rowNum, headerIndex['2차합격'] + 1).setValue(pass ? '합격' : '불합격');
      }
      logAction('합격설정', { applicationId: applicationId, stage: stage, pass: pass });
      return { success: true };
    }
  }
  return { success: false, message: '신청서를 찾을 수 없습니다.' };
}

function confirmFirstPassAndNotify(applicationIds) {
  const email = Session.getActiveUser().getEmail();
  
  const { data, headerIndex, sheet } = getSheetData(SHEETS.APPLICATIONS);
  const passedSheet = getSheet(SHEETS.PASSED_STUDENTS, true);
  const currentYear = new Date().getFullYear();
  const passedStudents = [];
  for (let i = 0; i < data.length; i++) {
    const rowId = data[i][headerIndex['ID']];
    if (applicationIds.includes(rowId)) {
      const rowNum = i + 2;
      sheet.getRange(rowNum, headerIndex['상태'] + 1).setValue('1차합격');
      sheet.getRange(rowNum, headerIndex['1차합격'] + 1).setValue('합격');
      const name = data[i][headerIndex['이름']];
      const phone = String(data[i][headerIndex['연락처']] || '');
      const applicantEmail = data[i][headerIndex['이메일']];
      const last4 = phone.slice(-4);
      passedSheet.appendRow([generateId(), currentYear, rowId, name, last4, '1차', formatDate(new Date())]);
      passedStudents.push({ name: name, email: applicantEmail, last4: last4 });
    }
  }
  passedStudents.forEach(student => { sendFirstPassEmail(student.email, student.name); });
  const settings = getSettings();
  settings.resultsPublic = true;
  saveSettings(settings);
  logAction('1차합격확정', { count: passedStudents.length });
  return { success: true, count: passedStudents.length };
}

function sendFirstPassEmail(email, name) {
  try { MailApp.sendEmail(email, '['+ORG_CONFIG.ORG_NAME+'] 사회복지현장실습 1차 합격 안내', '안녕하세요, '+name+'님.\n\n사회복지현장실습 1차 서류심사에 합격하셨습니다.\n\n2차 면접 일정은 별도로 안내될 예정입니다.\n합격 여부는 웹앱에서도 확인하실 수 있습니다.\n\n감사합니다.\n\n'+ORG_CONFIG.ORG_NAME+' 드림'); } catch (e) { console.error('이메일 발송 실패:', e); }
}

function confirmFinalPassAndNotify(applicationIds) {
  const email = Session.getActiveUser().getEmail();
  
  const { data, headerIndex, sheet } = getSheetData(SHEETS.APPLICATIONS);
  const passedSheet = getSheet(SHEETS.PASSED_STUDENTS, true);
  const currentYear = new Date().getFullYear();
  const passedStudents = [];
  for (let i = 0; i < data.length; i++) {
    const rowId = data[i][headerIndex['ID']];
    if (applicationIds.includes(rowId)) {
      const rowNum = i + 2;
      sheet.getRange(rowNum, headerIndex['상태'] + 1).setValue('최종합격');
      sheet.getRange(rowNum, headerIndex['2차합격'] + 1).setValue('합격');
      const name = data[i][headerIndex['이름']];
      const phone = String(data[i][headerIndex['연락처']] || '');
      const applicantEmail = data[i][headerIndex['이메일']];
      const last4 = phone.slice(-4);
      passedSheet.appendRow([generateId(), currentYear, rowId, name, last4, '최종', formatDate(new Date())]);
      passedStudents.push({ name: name, email: applicantEmail, last4: last4 });
    }
  }
  passedStudents.forEach(student => { sendFinalPassEmail(student.email, student.name); });
  logAction('최종합격확정', { count: passedStudents.length });
  return { success: true, count: passedStudents.length };
}

function sendFinalPassEmail(email, name) {
  try { MailApp.sendEmail(email, '['+ORG_CONFIG.ORG_NAME+'] 사회복지현장실습 최종 합격 안내', '안녕하세요, '+name+'님.\n\n사회복지현장실습 최종 합격을 축하드립니다!\n\n실습 전 필요한 정보 입력을 위해 웹앱에 접속하여\n\'최종합격자 정보입력\' 메뉴에서 필수 정보를 입력해 주세요.\n\n감사합니다.\n\n'+ORG_CONFIG.ORG_NAME+' 드림'); } catch (e) { console.error('이메일 발송 실패:', e); }
}

// 합격자 목록 가져오기 (공개용 - 이름 마스킹)
function getPassedStudents(year, stage) {
  const settings = getSettings();
  const userEmail = Session.getActiveUser().getEmail();
  
  // 결과 공개 설정 확인 (슈퍼바이저와 테스트 계정은 항상 볼 수 있음)
  if (!settings.resultsPublic && !isSupervisor(userEmail) && !isTestAccount(userEmail)) return [];
  
  const { data, headerIndex } = getSheetData(SHEETS.APPLICATIONS);
  const currentYear = year || new Date().getFullYear();
  const results = [];
  
  for (let i = 0; i < data.length; i++) {
    const rowYear = data[i][headerIndex['연도']];
    const status = data[i][headerIndex['상태']];
    const name = data[i][headerIndex['이름']] || '';
    const phone = data[i][headerIndex['연락처']] || '';
    
    if (String(rowYear) === String(currentYear)) {
      // stage 파라미터에 따라 필터링
      let match = false;
      let passStage = '';
      
      if (stage === '최종' && status === '최종합격') {
        match = true;
        passStage = '최종';
      } else if (!stage || stage === null) {
        // stage가 없으면 1차합격자만 (최종합격 제외)
        if (status === '1차합격') {
          match = true;
          passStage = '1차';
        }
      }
      
      if (match) {
        // 이름 마스킹: 홍길동 → 홍*동
        let displayName = name;
        if (name.length === 2) {
          displayName = name.charAt(0) + '*';
        } else if (name.length >= 3) {
          displayName = name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
        }
        
        // 연락처 뒷 4자리
        let last4 = '';
        if (phone) {
          const digits = phone.replace(/[^0-9]/g, '');
          last4 = digits.slice(-4);
        }
        
        results.push({
          displayName: displayName + (last4 ? ' (' + last4 + ')' : ''),
          name: displayName,
          last4: last4,
          stage: passStage
        });
      }
    }
  }
  
  return results;
}
// ==================== 최종합격자 정보 ====================
function saveFinalInfo(formData) {
  const email = Session.getActiveUser().getEmail();
  const appStatus = getMyApplicationStatus();
  
  // 테스트 계정은 최종합격 여부와 관계없이 테스트 가능
  const isTest = isTestAccount(email);
  if (!isTest && (!appStatus || appStatus.status !== '최종합격')) {
    return { success: false, message: '최종합격자만 정보를 입력할 수 있습니다.' };
  }
  
  let assignedDept = '';
  let assignedSupervisor = '';
  const studentName = appStatus ? appStatus.name : email.split('@')[0];
  const applicationId = appStatus ? appStatus.id : 'TEST-' + generateId();
  
  if (appStatus && appStatus.id) {
    const { data: appData, headerIndex: appIdx } = getSheetData(SHEETS.APPLICATIONS);
    for (let i = 0; i < appData.length; i++) {
      if (appData[i][appIdx['ID']] === appStatus.id) { assignedDept = appData[i][appIdx['배정부서']] || ''; break; }
    }
    if (assignedDept) {
      const supervisors = getSupervisorsByDepartment(assignedDept);
      if (supervisors.length > 0) assignedSupervisor = supervisors[0].name;
    }
  }
  
  const sheet = getSheet(SHEETS.FINAL_INFO, true);
  const currentYear = new Date().getFullYear();
  sheet.appendRow([generateId(), currentYear, applicationId, studentName, formData.ssn, formData.school, formData.department, formData.professor, formData.officialEmail, assignedDept, assignedSupervisor, formData.note || '', formatDate(new Date()), '동의함']);
  logAction('최종합격자정보입력', { applicationId: applicationId, testMode: isTest });
  return { success: true, message: '정보가 저장되었습니다.' + (isTest ? ' (테스트 모드)' : '') };
}

function getMyFinalInfo() {
  const email = Session.getActiveUser().getEmail();
  const appStatus = getMyApplicationStatus();
  
  // 테스트 계정은 기본값 반환
  if (isTestAccount(email) && !appStatus) {
    return { name: email.split('@')[0], ssn: '', school: '', department: '', professor: '', officialEmail: '', note: '', testMode: true };
  }
  
  if (!appStatus) return null;
  const { data, headerIndex } = getSheetData(SHEETS.FINAL_INFO);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['신청ID']] === appStatus.id) {
      return { name: data[i][headerIndex['이름']] || appStatus.name, ssn: data[i][headerIndex['주민등록번호']], school: data[i][headerIndex['학교']], department: data[i][headerIndex['학과']], professor: data[i][headerIndex['지도교수']], officialEmail: data[i][headerIndex['공문수신이메일']], assignedDepartment: data[i][headerIndex['배정부서']] || '', assignedSupervisor: data[i][headerIndex['담당슈퍼바이저']] || '', note: data[i][headerIndex['비고']] };
    }
  }
  // 저장된 정보가 없으면 신청 정보에서 기본값 가져오기
  return { name: appStatus.name || '', ssn: '', school: '', department: '', professor: '', officialEmail: '', note: '' };
}

// Alias for getFinalInfo (StudentApp에서 사용)
function getFinalInfo() {
  return getMyFinalInfo();
}

// ==================== 출석 관리 ====================
function recordAttendance(type, location, studentEmail) {
  try {
    // studentEmail이 전달되면 사용, 아니면 기존 방식
    const email = studentEmail || getEmail();
    if (!email) return { success: false, message: '로그인이 필요합니다.' };
    
    const sheet = getSheet(SHEETS.ATTENDANCE, true);
    const currentYear = new Date().getFullYear();
    const today = formatDateOnly(new Date());
    const time = formatTime(new Date());
    const { data, headerIndex } = getSheetData(SHEETS.ATTENDANCE);
    let rowIndex = -1;
    for (let i = 0; i < data.length; i++) {
      const rowDate = data[i][headerIndex['날짜']];
      const dateStr = rowDate instanceof Date ? formatDateOnly(rowDate) : String(rowDate || '');
      if (data[i][headerIndex['이메일']] === email && dateStr === today) { rowIndex = i + 2; break; }
    }
    const appStatus = studentEmail ? getMyApplicationStatusByEmail(studentEmail) : getMyApplicationStatus();
    const name = appStatus ? appStatus.name : email.split('@')[0];
    const address = location ? (location.address || '위치 정보 없음') : '위치 정보 없음';
    if (type === 'checkin') {
      if (rowIndex > 0) return { success: false, message: '오늘 이미 출근 기록이 있습니다.' };
      sheet.appendRow([generateId(), currentYear, email, name, today, time, '', address, '']);
    } else if (type === 'checkout') {
      if (rowIndex < 0) return { success: false, message: '오늘 출근 기록이 없습니다. 먼저 출근 체크를 해주세요.' };
      const realSheet = getSheet(SHEETS.ATTENDANCE, false);
      realSheet.getRange(rowIndex, headerIndex['퇴근시간'] + 1).setValue(time);
      realSheet.getRange(rowIndex, headerIndex['퇴근주소'] + 1).setValue(address);
    }
    logAction('출석기록', { type: type, date: today, time: time });
    return { success: true, message: type === 'checkin' ? '출근이 기록되었습니다.' : '퇴근이 기록되었습니다.' };
  } catch (error) {
    console.error('recordAttendance ERROR:', error);
    return { success: false, message: '출석 기록 중 오류가 발생했습니다.' };
  }
}

function getMyAttendance(startDate, endDate, studentEmail) {
  try {
    // studentEmail이 전달되면 사용, 아니면 기존 방식
    const email = studentEmail || getEmail();
    console.log('getMyAttendance - email:', email, 'startDate:', startDate, 'endDate:', endDate);
    
    const { data, headerIndex } = getSheetData(SHEETS.ATTENDANCE);
    console.log('getMyAttendance - data length:', data ? data.length : 0);
    
    const results = [];
    
    for (let i = 0; i < data.length; i++) {
      const rowEmail = data[i][headerIndex['이메일']];
      const emailMatch = rowEmail === email;
      
      if (emailMatch) {
        const dateValue = data[i][headerIndex['날짜']];
        const dateStr = dateValue instanceof Date ? formatDateOnly(dateValue) : String(dateValue || '');
        
        // 기간 필터링
        let inRange = true;
        if (startDate && dateStr < startDate) inRange = false;
        if (endDate && dateStr > endDate) inRange = false;
        
        if (inRange) {
          const checkinVal = data[i][headerIndex['출근시간']];
          const checkoutVal = data[i][headerIndex['퇴근시간']];
          results.push({ 
            date: dateStr, 
            checkin: checkinVal instanceof Date ? formatTime(checkinVal) : (checkinVal || ''), 
            checkout: checkoutVal instanceof Date ? formatTime(checkoutVal) : (checkoutVal || ''), 
            checkinLocation: data[i][headerIndex['출근주소']] || '', 
            checkoutLocation: data[i][headerIndex['퇴근주소']] || '' 
          });
        }
      }
    }
    
    console.log('getMyAttendance - results count:', results.length);
    // 날짜순 정렬
    results.sort((a, b) => a.date.localeCompare(b.date));
    return results;
  } catch (error) { 
    console.error('getMyAttendance error:', error);
    return []; 
  }
}

function getAllAttendance(year, startDate, endDate) {
  try {
    console.log('getAllAttendance - START - year:', year, 'startDate:', startDate, 'endDate:', endDate);
    // 자체 로그인 시스템 사용으로 권한 체크 생략
    
    const { data, headerIndex } = getSheetData(SHEETS.ATTENDANCE);
    console.log('getAllAttendance - data length:', data ? data.length : 0);
    console.log('getAllAttendance - headerIndex:', JSON.stringify(headerIndex));
    
    const results = [];
    for (let i = 0; i < data.length; i++) {
      const rowYear = data[i][headerIndex['연도']];
      const yearMatch = rowYear == year;
      console.log('getAllAttendance - row', i, 'year:', rowYear, 'type:', typeof rowYear, 'match:', yearMatch);
      
      if (yearMatch) {
        const dateValue = data[i][headerIndex['날짜']];
        const dateStr = dateValue instanceof Date ? formatDateOnly(dateValue) : String(dateValue || '');
        console.log('getAllAttendance - dateValue:', dateValue, 'type:', typeof dateValue, 'isDate:', dateValue instanceof Date, 'dateStr:', dateStr);
        
        // 기간 필터링
        let inRange = true;
        if (startDate && dateStr < startDate) inRange = false;
        if (endDate && dateStr > endDate) inRange = false;
        console.log('getAllAttendance - inRange:', inRange, 'dateStr:', dateStr, 'startDate:', startDate, 'endDate:', endDate);
        
        if (inRange) {
          const checkinVal = data[i][headerIndex['출근시간']];
          const checkoutVal = data[i][headerIndex['퇴근시간']];
          results.push({ 
            email: data[i][headerIndex['이메일']] || '', 
            name: data[i][headerIndex['이름']] || '', 
            date: dateStr, 
            checkin: checkinVal instanceof Date ? formatTime(checkinVal) : (checkinVal || ''), 
            checkout: checkoutVal instanceof Date ? formatTime(checkoutVal) : (checkoutVal || ''), 
            checkinLocation: data[i][headerIndex['출근주소']] || '', 
            checkoutLocation: data[i][headerIndex['퇴근주소']] || '' 
          });
        }
      }
    }
    
    // 날짜순 정렬
    results.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.name.localeCompare(b.name);
    });
    
    console.log('getAllAttendance - results count:', results.length);
    return results;
  } catch (error) { 
    console.error('getAllAttendance error:', error);
    return []; 
  }
}

// 특정 실습생의 출석 기록 조회 (슈퍼바이저용)
function getStudentAttendance(email, startDate, endDate) {
  try {
    const { data, headerIndex } = getSheetData(SHEETS.ATTENDANCE);
    const results = [];
    
    for (let i = 0; i < data.length; i++) {
      if (data[i][headerIndex['이메일']] === email) {
        const dateValue = data[i][headerIndex['날짜']];
        const dateStr = dateValue instanceof Date ? formatDateOnly(dateValue) : String(dateValue || '');
        
        let inRange = true;
        if (startDate && dateStr < startDate) inRange = false;
        if (endDate && dateStr > endDate) inRange = false;
        
        if (inRange) {
          const checkinVal = data[i][headerIndex['출근시간']];
          const checkoutVal = data[i][headerIndex['퇴근시간']];
          results.push({ 
            date: dateStr, 
            checkin: checkinVal instanceof Date ? formatTime(checkinVal) : (checkinVal || ''), 
            checkout: checkoutVal instanceof Date ? formatTime(checkoutVal) : (checkoutVal || ''),
            checkinLocation: data[i][headerIndex['출근주소']] || '',
            checkoutLocation: data[i][headerIndex['퇴근주소']] || ''
          });
        }
      }
    }
    
    results.sort((a, b) => a.date.localeCompare(b.date));
    return results;
  } catch (error) { 
    console.error('getStudentAttendance error:', error);
    return []; 
  }
}

// 출석부 PDF 생성
function generateAttendanceReport(email, name, startDate, endDate) {
  try {
    const records = email ? getStudentAttendance(email, startDate, endDate) : [];
    if (records.length === 0) {
      return { success: false, message: '출석 기록이 없습니다.' };
    }
    
    // 총 출석일, 총 근무시간 계산
    let totalDays = records.length;
    let totalMinutes = 0;
    
    records.forEach(r => {
      if (r.checkin && r.checkout) {
        const [inH, inM] = r.checkin.split(':').map(Number);
        const [outH, outM] = r.checkout.split(':').map(Number);
        const inMinutes = inH * 60 + inM;
        const outMinutes = outH * 60 + outM;
        if (outMinutes > inMinutes) {
          totalMinutes += (outMinutes - inMinutes);
        }
      }
    });
    
    const totalHours = Math.floor(totalMinutes / 60);
    const remainMinutes = totalMinutes % 60;
    
    // HTML 생성
    let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { margin: 20mm 15mm; }
    body { font-family: 'Malgun Gothic', sans-serif; padding: 0; margin: 0; font-size: 11pt; }
    .header { text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #1a365d; }
    .logo { max-height: 60px; margin-bottom: 10px; }
    .org-name { font-size: 14pt; font-weight: bold; color: #1a365d; margin: 5px 0; }
    .org-info { font-size: 9pt; color: #666; }
    h1 { text-align: center; font-size: 18pt; margin: 25px 0; color: #1a365d; }
    .info-table { width: 100%; margin-bottom: 20px; border-collapse: collapse; }
    .info-table td { padding: 8px 12px; border: 1px solid #ddd; }
    .info-table .label { background: #f5f5f5; font-weight: bold; width: 120px; }
    table.attendance { width: 100%; border-collapse: collapse; margin-top: 15px; }
    table.attendance th, table.attendance td { border: 1px solid #333; padding: 8px; text-align: center; font-size: 10pt; }
    table.attendance th { background: #1a365d; color: white; }
    table.attendance tr:nth-child(even) { background: #f9f9f9; }
    .summary { margin-top: 25px; padding: 15px; background: #f0f4f8; border-radius: 5px; border-left: 4px solid #1a365d; }
    .summary p { margin: 5px 0; }
    .footer { margin-top: 40px; text-align: center; font-size: 9pt; color: #666; padding-top: 15px; border-top: 1px solid #ddd; }
    .signature-area { margin-top: 50px; display: flex; justify-content: space-around; }
    .signature-box { text-align: center; width: 200px; }
    .signature-line { border-top: 1px solid #333; margin-top: 50px; padding-top: 5px; }
  </style>
</head>
<body>
  <div class="header">
    <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
      <div style="font-size: 11pt; color: #666;">'+ORG_CONFIG.ORG_PARENT+'</div>
      <div class="org-name">'+ORG_CONFIG.ORG_NAME+'</div>
    </div>
    <div class="org-info">'+ORG_CONFIG.ORG_ADDRESS+' | Tel: '+ORG_CONFIG.ORG_TEL+'</div>
  </div>
  
  <h1>사회복지현장실습 출석부</h1>
  
  <table class="info-table">
    <tr>
      <td class="label">실습생명</td>
      <td>${name}</td>
      <td class="label">실습기간</td>
      <td>${startDate} ~ ${endDate}</td>
    </tr>
    <tr>
      <td class="label">총 출석일수</td>
      <td>${totalDays}일</td>
      <td class="label">총 실습시간</td>
      <td>${totalHours}시간 ${remainMinutes}분</td>
    </tr>
  </table>
  
  <table class="attendance">
    <thead>
      <tr>
        <th style="width: 40px;">No.</th>
        <th style="width: 100px;">날짜</th>
        <th style="width: 80px;">출근시간</th>
        <th style="width: 80px;">퇴근시간</th>
        <th style="width: 100px;">실습시간</th>
        <th>실습내용/비고</th>
      </tr>
    </thead>
    <tbody>`;
    
    records.forEach((r, idx) => {
      let workTime = '-';
      if (r.checkin && r.checkout) {
        const [inH, inM] = r.checkin.split(':').map(Number);
        const [outH, outM] = r.checkout.split(':').map(Number);
        const minutes = (outH * 60 + outM) - (inH * 60 + inM);
        if (minutes > 0) {
          workTime = Math.floor(minutes / 60) + '시간 ' + (minutes % 60) + '분';
        }
      }
      html += `
      <tr>
        <td>${idx + 1}</td>
        <td>${r.date}</td>
        <td>${r.checkin || '-'}</td>
        <td>${r.checkout || '-'}</td>
        <td>${workTime}</td>
        <td></td>
      </tr>`;
    });
    
    html += `
    </tbody>
  </table>
  
  <div class="summary">
    <p><strong>※ 실습 요약</strong></p>
    <p>• 총 출석일수: <strong>${totalDays}일</strong></p>
    <p>• 총 실습시간: <strong>${totalHours}시간 ${remainMinutes}분</strong></p>
  </div>
  
  <div class="signature-area">
    <div class="signature-box">
      <div class="signature-line">실습생</div>
    </div>
    <div class="signature-box">
      <div class="signature-line">슈퍼바이저</div>
    </div>
    <div class="signature-box">
      <div class="signature-line">기관장</div>
    </div>
  </div>
  
  <div class="footer">
    <p>출력일: ${formatDateOnly(new Date())}</p>
    <p>본 문서는 '+ORG_CONFIG.ORG_NAME+' 사회복지현장실습 관리시스템에서 자동 생성되었습니다.</p>
  </div>
</body>
</html>`;

    // PDF 생성 후 base64로 반환
    const blob = Utilities.newBlob(html, 'text/html', '출석부.html');
    const pdf = blob.getAs('application/pdf');
    const pdfBase64 = Utilities.base64Encode(pdf.getBytes());
    const fileName = name + '_출석부_' + startDate + '_' + endDate + '.pdf';
    
    return { success: true, pdfBase64: pdfBase64, fileName: fileName };
  } catch (error) {
    console.error('generateAttendanceReport error:', error);
    return { success: false, message: '출석부 생성 중 오류가 발생했습니다: ' + error.toString() };
  }
}

// 내 출석부 PDF 생성 (실습생용)
function generateMyAttendanceReport(startDate, endDate, studentEmail) {
  // studentEmail이 전달되면 사용, 아니면 기존 방식
  const email = studentEmail || getEmail();
  const appStatus = studentEmail ? getMyApplicationStatusByEmail(studentEmail) : getMyApplicationStatus();
  const name = appStatus ? appStatus.name : email.split('@')[0];
  return generateAttendanceReport(email, name, startDate, endDate);
}

// 최종합격자 목록 조회 (출석부 출력용)
function getFinalStudents() {
  try {
    const currentYear = new Date().getFullYear();
    console.log('getFinalStudents - currentYear:', currentYear);
    
    // 방법 1: 출석부에서 실습생 목록 가져오기 (실제 출석 기록이 있는 사람)
    const { data: attendanceData, headerIndex: attIndex } = getSheetData(SHEETS.ATTENDANCE);
    console.log('getFinalStudents - attendance data length:', attendanceData ? attendanceData.length : 0);
    
    const studentsFromAttendance = {};
    if (attendanceData && attendanceData.length > 0) {
      attendanceData.forEach(row => {
        if (row[attIndex['연도']] == currentYear) {
          const email = row[attIndex['이메일']];
          if (email && !studentsFromAttendance[email]) {
            studentsFromAttendance[email] = {
              email: email,
              name: row[attIndex['이름']] || '',
              school: '',
              department: ''
            };
          }
        }
      });
    }
    
    // 방법 2: 실습신청에서 최종합격자 목록 가져오기
    const { data: appData, headerIndex: appIndex } = getSheetData(SHEETS.APPLICATIONS);
    console.log('getFinalStudents - applications data length:', appData ? appData.length : 0);
    
    if (appData && appData.length > 0) {
      appData.forEach(row => {
        if (row[appIndex['연도']] == currentYear && row[appIndex['상태']] === '최종합격') {
          const email = row[appIndex['이메일']];
          if (email) {
            studentsFromAttendance[email] = {
              email: email,
              name: row[appIndex['이름']] || '',
              school: row[appIndex['학교']] || '',
              department: row[appIndex['학과']] || ''
            };
          }
        }
      });
    }
    
    const result = Object.values(studentsFromAttendance);
    console.log('getFinalStudents - result count:', result.length, 'students:', JSON.stringify(result));
    return result;
  } catch (error) {
    console.error('getFinalStudents error:', error);
    return [];
  }
}

// ==================== 공지사항 ====================
function createNotice(title, content, fileId, fileName, target) {
  const email = Session.getActiveUser().getEmail();
  
  
  // 파일 공유 설정 추가
  if (fileId) {
    try {
      const file = DriveApp.getFileById(fileId);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (e) {
      console.log('파일 공유 설정 실패:', e);
    }
  }
  
  const sheet = getSheet(SHEETS.NOTICES, true);
  sheet.appendRow([generateId(), title, content, target || '전체', email.split('@')[0], formatDate(new Date()), fileId || '', fileName || '', 0]);
  logAction('공지등록', { title: title });
  return { success: true };
}

function getNotices(page, pageSize, target) {
  try {
    const sheet = getSheet(SHEETS.NOTICES, false);
    if (!sheet) {
      console.log('getNotices - sheet not found');
      return { items: [], totalCount: 0, totalPages: 0, currentPage: page || 1 };
    }
    
    const allData = sheet.getDataRange().getValues();
    console.log('getNotices - raw data rows:', allData.length);
    
    if (allData.length <= 1) {
      return { items: [], totalCount: 0, totalPages: 0, currentPage: page || 1 };
    }
    
    const headers = allData[0];
    const data = allData.slice(1);
    
    // 헤더 인덱스 생성
    const headerIndex = {};
    headers.forEach((h, idx) => { if (h) headerIndex[String(h).trim()] = idx; });
    console.log('getNotices - headerIndex:', JSON.stringify(headerIndex));
    
    // ID가 있는 행만 필터
    let filtered = data.filter(row => row[headerIndex['ID']]);
    console.log('getNotices - after ID filter:', filtered.length);
    
    // 대상 필터링
    if (target && target !== '전체') {
      const targetTrimmed = String(target).trim();
      filtered = filtered.filter(row => {
        const rowTarget = String(row[headerIndex['대상']] || '').trim();
        return rowTarget === targetTrimmed || rowTarget === '전체';
      });
      console.log('getNotices - after target filter:', filtered.length);
    }
    
    // 날짜 정렬 (최신순)
    const dateIdx = headerIndex['작성일'];
    filtered.sort((a, b) => {
      const dateA = a[dateIdx] ? new Date(a[dateIdx]) : new Date(0);
      const dateB = b[dateIdx] ? new Date(b[dateIdx]) : new Date(0);
      return dateB - dateA;
    });
    
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / (pageSize || 10)) || 1;
    const startIdx = ((page || 1) - 1) * (pageSize || 10);
    const pageData = filtered.slice(startIdx, startIdx + (pageSize || 10));
    
    const items = pageData.map(row => ({
      id: row[headerIndex['ID']],
      title: row[headerIndex['제목']] || '',
      content: row[headerIndex['내용']] || '',
      target: String(row[headerIndex['대상']] || '').trim(),
      author: row[headerIndex['작성자']] || '',
      createdAt: row[headerIndex['작성일']] instanceof Date ? formatDate(row[headerIndex['작성일']]) : String(row[headerIndex['작성일']] || ''),
      fileId: row[headerIndex['파일ID']] || '',
      fileName: row[headerIndex['파일명']] || '',
      views: row[headerIndex['조회수']] || 0
    }));
    
    console.log('getNotices - returning items:', items.length);
    return { items: items, totalCount: totalCount, totalPages: totalPages, currentPage: page || 1 };
  } catch (error) { 
    console.error('getNotices error:', error);
    return { items: [], totalCount: 0, totalPages: 0, currentPage: 1 }; 
  }
}

// 단일 공지사항 조회
function getNotice(id) {
  try {
    const { data, headerIndex } = getSheetData(SHEETS.NOTICES);
    if (!data || headerIndex['ID'] === undefined) return null;
    const row = data.find(r => r[headerIndex['ID']] === id);
    if (!row) return null;
    // 조회수 증가
    incrementNoticeView(id);
    return {
      id: row[headerIndex['ID']],
      title: row[headerIndex['제목']],
      content: row[headerIndex['내용']],
      target: row[headerIndex['대상']],
      author: row[headerIndex['작성자']],
      createdAt: row[headerIndex['작성일']],
      fileId: row[headerIndex['파일ID']],
      fileName: row[headerIndex['파일명']],
      views: (row[headerIndex['조회수']] || 0) + 1
    };
  } catch (error) {
    console.error('getNotice error:', error);
    return null;
  }
}

function deleteNotice(id) {
  const email = Session.getActiveUser().getEmail();
  
  const { data, headerIndex, sheet } = getSheetData(SHEETS.NOTICES);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['ID']] === id) { sheet.deleteRow(i + 2); logAction('공지삭제', { id: id }); return { success: true }; }
  }
  return { success: false, message: '공지사항을 찾을 수 없습니다.' };
}

function incrementNoticeView(id) {
  const { data, headerIndex, sheet } = getSheetData(SHEETS.NOTICES);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['ID']] === id) {
      const currentViews = data[i][headerIndex['조회수']] || 0;
      sheet.getRange(i + 2, headerIndex['조회수'] + 1).setValue(currentViews + 1);
      return { success: true };
    }
  }
  return { success: false };
}
// 실습계획서 조회
function getPracticePlan() {
  try {
    const { data, headerIndex } = getSheetData(SHEETS.FORMS);
    const plan = data.find(row => row[headerIndex['유형']] === '실습계획서' || row[headerIndex['서식명']]?.includes('실습계획서'));
    if (plan) {
      return {
        fileId: plan[headerIndex['파일ID']],
        fileName: plan[headerIndex['파일명']] || plan[headerIndex['서식명']]
      };
    }
    return null;
  } catch (error) {
    console.error('getPracticePlan error:', error);
    return null;
  }
}

// ==================== 실습서식 ====================
function uploadForm(name, formType, description, fileId, fileName) {
  const email = Session.getActiveUser().getEmail();
  
  
  // 파일 공유 설정 추가
  if (fileId) {
    try {
      const file = DriveApp.getFileById(fileId);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (e) {
      console.log('파일 공유 설정 실패:', e);
    }
  }
  
  const sheet = getSheet(SHEETS.FORMS, true);
  sheet.appendRow([generateId(), name, formType || '일반', description || '', fileId, fileName, email.split('@')[0], formatDate(new Date()), 0]);
  logAction('서식등록', { name: name, type: formType });
  return { success: true };
}

function getFormTypes() { return ['사전과제', '실습계약', '실습일지', '실습평가', '사례관리', '프로그램', '회의', '기타']; }

// 서식 수정
function updateForm(formId, name, formType, description) {
  const email = Session.getActiveUser().getEmail();
  
  
  const { data, headerIndex, sheet } = getSheetData(SHEETS.FORMS);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['ID']] === formId) {
      if (name) sheet.getRange(i + 2, headerIndex['서식명'] + 1).setValue(name);
      if (formType) sheet.getRange(i + 2, headerIndex['유형'] + 1).setValue(formType);
      if (description !== undefined) sheet.getRange(i + 2, headerIndex['설명'] + 1).setValue(description);
      logAction('서식수정', { id: formId, name: name });
      return { success: true, message: '서식이 수정되었습니다.' };
    }
  }
  return { success: false, message: '서식을 찾을 수 없습니다.' };
}

// 서식 삭제
function deleteForm(formId) {
  const email = Session.getActiveUser().getEmail();
  
  
  const { data, headerIndex, sheet } = getSheetData(SHEETS.FORMS);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['ID']] === formId) {
      sheet.deleteRow(i + 2);
      logAction('서식삭제', { id: formId });
      return { success: true, message: '서식이 삭제되었습니다.' };
    }
  }
  return { success: false, message: '서식을 찾을 수 없습니다.' };
}

function getForms() {
  try {
    const { data, headerIndex } = getSheetData(SHEETS.FORMS);
    return data.filter(row => row[headerIndex['ID']]).map(row => ({ id: row[headerIndex['ID']], name: row[headerIndex['서식명']], type: row[headerIndex['유형']] || '일반', description: row[headerIndex['설명']], fileId: row[headerIndex['파일ID']], fileName: row[headerIndex['파일명']], uploader: row[headerIndex['등록자']], uploadedAt: row[headerIndex['등록일']] instanceof Date ? formatDate(row[headerIndex['등록일']]) : row[headerIndex['등록일']], downloads: row[headerIndex['다운로드수']] || 0 }));
  } catch (error) { return []; }
}

function incrementDownloadCount(formId) {
  const { data, headerIndex, sheet } = getSheetData(SHEETS.FORMS);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['ID']] === formId) {
      const currentCount = data[i][headerIndex['다운로드수']] || 0;
      sheet.getRange(i + 2, headerIndex['다운로드수'] + 1).setValue(currentCount + 1);
      return { success: true };
    }
  }
  return { success: false };
}

function getFormTemplateList() {
  return [
    { id: 'contract', name: '실습계약서', type: '별지6' },
    { id: 'profile', name: '실습생 Profile', type: '별지3' },
    { id: 'daily_log', name: '실습일지', type: '별지8' },
    { id: 'org_analysis', name: '기관분석보고서', type: '별지9' },
    { id: 'community_analysis', name: '지역사회분석보고서', type: '별지10' },
    { id: 'other_report', name: '기타과제보고서', type: '별지12' },
    { id: 'book_review', name: '필독서 서평보고서', type: '별지13' },
    { id: 'mid_evaluation', name: '실습중간평가서', type: '별지14' },
    { id: 'final_evaluation', name: '실습종결평가서', type: '별지15' },
    { id: 'case_counseling', name: '사례관리 상담기록지', type: '사례관리' },
    { id: 'program_plan', name: '프로그램 실행계획서', type: '프로그램' },
    { id: 'program_result', name: '프로그램 실행결과보고서', type: '프로그램' }
  ];
}

// ==================== 과제 제출 ====================
function submitAssignment(formId, formName, formType, title, content, fileId, fileName, studentEmail) {
  // studentEmail이 전달되면 사용, 아니면 기존 방식
  const email = studentEmail || Session.getActiveUser().getEmail();
  const appStatus = studentEmail ? getMyApplicationStatusByEmail(studentEmail) : getMyApplicationStatus();
  
  // 테스트 계정은 최종합격 여부와 관계없이 테스트 가능
  const isTest = isTestAccount(email);
  if (!isTest && (!appStatus || appStatus.status !== '최종합격')) {
    return { success: false, message: '최종합격자만 과제를 제출할 수 있습니다.' };
  }
  
  const sheet = getSheet(SHEETS.SUBMISSIONS, true);
  let assignedSupervisors = [];
  let assignedDept = '';
  let studentName = appStatus ? appStatus.name : email.split('@')[0]; // 테스트용 이름
  
  if (appStatus && appStatus.id) {
    const { data, headerIndex } = getSheetData(SHEETS.APPLICATIONS);
    for (let i = 0; i < data.length; i++) {
      if (data[i][headerIndex['ID']] === appStatus.id) {
        assignedDept = data[i][headerIndex['배정부서']] || '';
        if (assignedDept) { 
          assignedSupervisors = getSupervisorsByDepartment(assignedDept);
        }
        break;
      }
    }
  }
  
  const primarySupervisor = assignedSupervisors.length > 0 ? assignedSupervisors[0].email : '';
  // 실제 시트 구조: ID, 연도, 이메일, 이름, 유형, 제목, 내용, 파일ID, 파일명, 슈퍼바이저, 제출일시, 확인여부, 피드백, 피드백일시
  sheet.appendRow([generateId(), new Date().getFullYear(), email, studentName, formType || formName || '', title, content || '', fileId || '', fileName || '', primarySupervisor, formatDate(new Date()), '', '', '']);
  
  // 배정 부서의 모든 슈퍼바이저에게 알림 (테스트 모드에서는 알림 생략 가능)
  if (!isTest) {
    assignedSupervisors.forEach(function(sup) {
      sendAssignmentNotification(sup.email, studentName, formType || formName, title, assignedDept);
    });
  }
  
  logAction('과제제출', { type: formType, title: title, testMode: isTest });
  return { success: true, message: '과제가 제출되었습니다.' + (isTest ? ' (테스트 모드)' : '') };
}

function sendAssignmentNotification(supervisorEmail, studentName, assignmentType, title, department) {
  try { 
    const subject = '[실습과제] ' + studentName + ' 실습생 과제 제출 알림';
    const body = '안녕하세요.\n\n' +
      '실습생 ' + studentName + '님이 과제를 제출하였습니다.\n\n' +
      '■ 배정 부서: ' + (department || '-') + '\n' +
      '■ 과제 유형: ' + assignmentType + '\n' +
      '■ 제목: ' + title + '\n' +
      '■ 제출일시: ' + formatDate(new Date()) + '\n\n' +
      '슈퍼바이저 웹앱에서 확인해 주세요.\n\n' +
      '감사합니다.\n' +
      ''+ORG_CONFIG.ORG_NAME+' 사회복지현장실습';
    MailApp.sendEmail(supervisorEmail, subject, body);
  } catch (e) { 
    console.error('과제 알림 메일 발송 실패:', e); 
  }
}

function sendFeedbackNotification(studentEmail, studentName, title, feedback) {
  try { MailApp.sendEmail(studentEmail, '[실습과제] 과제 피드백이 등록되었습니다', '안녕하세요, '+studentName+'님.\n\n제출하신 과제에 대한 피드백이 등록되었습니다.\n\n■ 과제 제목: '+title+'\n\n■ 피드백 내용:\n'+feedback+'\n\n슈퍼바이저의 피드백을 확인하시고, 추가 질문이 있으시면 담당 슈퍼바이저에게 문의해 주세요.\n\n감사합니다.\n'+ORG_CONFIG.ORG_NAME+' 사회복지현장실습'); } catch (e) { console.error('피드백 알림 메일 발송 실패:', e); }
}

function getMySubmissions() {
  try {
    const email = Session.getActiveUser().getEmail();
    const { data, headerIndex } = getSheetData(SHEETS.SUBMISSIONS);
    const currentYear = new Date().getFullYear();
    return data.filter(row => row[headerIndex['이메일']] === email && row[headerIndex['연도']] == currentYear).map(row => ({ 
      id: row[headerIndex['ID']], 
      type: row[headerIndex['유형']] || '', 
      title: row[headerIndex['제목']], 
      content: row[headerIndex['내용']], 
      fileId: row[headerIndex['파일ID']], 
      fileName: row[headerIndex['파일명']], 
      supervisor: row[headerIndex['슈퍼바이저']] || '', 
      submittedAt: row[headerIndex['제출일시']] instanceof Date ? formatDate(row[headerIndex['제출일시']]) : row[headerIndex['제출일시']], 
      confirmed: row[headerIndex['확인여부']] === '확인됨', 
      feedback: row[headerIndex['피드백']] || '', 
      feedbackAt: row[headerIndex['피드백일시']] instanceof Date ? formatDate(row[headerIndex['피드백일시']]) : (row[headerIndex['피드백일시']] || '') 
    }));
  } catch (error) { return []; }
}

function getAllSubmissions(year) {
  try {
    
    const { data, headerIndex } = getSheetData(SHEETS.SUBMISSIONS);
    return data.filter(row => row[headerIndex['ID']] && row[headerIndex['연도']] == year).map(row => ({ 
      id: row[headerIndex['ID']], 
      studentEmail: row[headerIndex['이메일']], 
      studentName: row[headerIndex['이름']], 
      type: row[headerIndex['유형']] || '', 
      title: row[headerIndex['제목']], 
      content: row[headerIndex['내용']], 
      fileId: row[headerIndex['파일ID']], 
      fileName: row[headerIndex['파일명']], 
      supervisor: row[headerIndex['슈퍼바이저']] || '', 
      submittedAt: row[headerIndex['제출일시']] instanceof Date ? formatDate(row[headerIndex['제출일시']]) : row[headerIndex['제출일시']], 
      confirmed: row[headerIndex['확인여부']] === '확인됨', 
      feedback: row[headerIndex['피드백']] || '', 
      feedbackAt: row[headerIndex['피드백일시']] instanceof Date ? formatDate(row[headerIndex['피드백일시']]) : (row[headerIndex['피드백일시']] || '') 
    }));
  } catch (error) { return []; }
}

function confirmSubmission(submissionId, feedback) {
  const email = Session.getActiveUser().getEmail();
  
  const { data, headerIndex, sheet } = getSheetData(SHEETS.SUBMISSIONS);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['ID']] === submissionId) {
      const rowNum = i + 2;
      const studentEmail = data[i][headerIndex['이메일']];
      const studentName = data[i][headerIndex['이름']];
      const title = data[i][headerIndex['제목']];
      sheet.getRange(rowNum, headerIndex['확인여부'] + 1).setValue('확인됨');
      sheet.getRange(rowNum, headerIndex['피드백'] + 1).setValue(feedback || '');
      sheet.getRange(rowNum, headerIndex['피드백일시'] + 1).setValue(formatDate(new Date()));
      if (feedback && studentEmail) sendFeedbackNotification(studentEmail, studentName, title, feedback);
      logAction('과제확인', { submissionId: submissionId });
      return { success: true };
    }
  }
  return { success: false, message: '과제를 찾을 수 없습니다.' };
}
// ==================== 만족도 조사 ====================
function submitSatisfaction(responses) {
  const email = Session.getActiveUser().getEmail();
  const sheet = getSheet(SHEETS.SATISFACTION, true);
  const currentYear = new Date().getFullYear();
  const uuid = Utilities.getUuid();
  sheet.appendRow([generateId(), currentYear, formatDate(new Date()), uuid, responses.q1 || '', responses.q2 || '', responses.q3 || '', responses.q4 || '', responses.q5 || '', responses.q6 || '', responses.q7 || '', responses.q8 || '', responses.q9 || '', responses.q10 || '', responses.positive || '', responses.improvement || '', responses.other || '']);
  logAction('만족도제출', { year: currentYear });
  return { success: true, message: '만족도 조사가 제출되었습니다.' };
}

function getSatisfactionResults(year) {
  try {
    const email = Session.getActiveUser().getEmail();
    const ADMIN_EMAIL = 'jji@sillym.or.kr';
    if (email !== ADMIN_EMAIL && !isTestAccount(email)) return { restricted: true, message: '만족도 조사 결과는 관리자만 조회할 수 있습니다.' };
    const { data, headerIndex } = getSheetData(SHEETS.SATISFACTION);
    return data.filter(row => row[headerIndex['ID']] && row[headerIndex['연도']] == year).map(row => ({ id: row[headerIndex['ID']], submittedAt: row[headerIndex['제출일시']] instanceof Date ? formatDate(row[headerIndex['제출일시']]) : row[headerIndex['제출일시']], responses: { q1: row[headerIndex['q1']], q2: row[headerIndex['q2']], q3: row[headerIndex['q3']], q4: row[headerIndex['q4']], q5: row[headerIndex['q5']], q6: row[headerIndex['q6']], q7: row[headerIndex['q7']], q8: row[headerIndex['q8']], q9: row[headerIndex['q9']], q10: row[headerIndex['q10']], positive: row[headerIndex['positive']], improvement: row[headerIndex['improvement']], other: row[headerIndex['other']] } }));
  } catch (error) { return []; }
}

// ==================== 슈퍼바이저 관리 ====================
function getSupervisors() {
  try {
    const { data, headerIndex } = getSheetData(SHEETS.SUPERVISORS);
    return data.filter(row => row[headerIndex['ID']]).map(row => ({ 
      id: row[headerIndex['ID']], 
      name: row[headerIndex['이름']], 
      department: row[headerIndex['부서']], 
      position: row[headerIndex['직위']], 
      email: row[headerIndex['이메일']], 
      password: row[headerIndex['비밀번호']] || '',
      active: row[headerIndex['활성화']] === true || row[headerIndex['활성화']] === 'TRUE' 
    }));
  } catch (error) { return []; }
}

function getSupervisorsByDepartment(department) {
  const supervisors = getSupervisors();
  return supervisors.filter(s => s.department === department && s.active);
}

function addSupervisor(name, department, position, email, password) {
  // 권한 체크 생략 (자체 로그인 시스템 사용)
  const sheet = getSheet(SHEETS.SUPERVISORS, true);
  sheet.appendRow([generateId(), name, department, position, email, password, true]);
  logAction('슈퍼바이저추가', { name: name, email: email });
  return { success: true };
}

function updateSupervisor(id, name, department, position, email, password, active) {
  // 권한 체크 생략 (자체 로그인 시스템 사용)
  const { data, headerIndex, sheet } = getSheetData(SHEETS.SUPERVISORS);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['ID']] === id) {
      const rowNum = i + 2;
      sheet.getRange(rowNum, 1, 1, 7).setValues([[id, name, department, position, email, password, active]]);
      logAction('슈퍼바이저수정', { id: id, name: name });
      return { success: true };
    }
  }
  return { success: false, message: '슈퍼바이저를 찾을 수 없습니다.' };
}

function deleteSupervisor(id) {
  // 권한 체크 생략 (자체 로그인 시스템 사용)
  const { data, headerIndex, sheet } = getSheetData(SHEETS.SUPERVISORS);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['ID']] === id) { sheet.deleteRow(i + 2); logAction('슈퍼바이저삭제', { id: id }); return { success: true }; }
  }
  return { success: false, message: '슈퍼바이저를 찾을 수 없습니다.' };
}

// ==================== 부서 배정 ====================
// 최종합격자 목록 가져오기 (부서 배정용)
function getStudents(year) {
  const email = Session.getActiveUser().getEmail();
  
  
  const { data, headerIndex } = getSheetData(SHEETS.APPLICATIONS);
  const results = [];
  
  for (let i = 0; i < data.length; i++) {
    const rowYear = data[i][headerIndex['연도']];
    const status = data[i][headerIndex['상태']];
    
    // 해당 연도의 최종합격자만 필터링
    if (String(rowYear) === String(year) && status === '최종합격') {
      results.push({
        id: data[i][headerIndex['ID']],
        name: data[i][headerIndex['이름']] || '-',
        school: data[i][headerIndex['학교']] || '-',
        department: data[i][headerIndex['학과']] || '-',
        assignedDepartment: data[i][headerIndex['배정부서']] || ''
      });
    }
  }
  
  return results;
}

function assignDepartment(applicationId, department) {
  const email = Session.getActiveUser().getEmail();
  
  const { data, headerIndex, sheet } = getSheetData(SHEETS.APPLICATIONS);
  for (let i = 0; i < data.length; i++) {
    if (data[i][headerIndex['ID']] === applicationId) {
      const rowNum = i + 2;
      sheet.getRange(rowNum, headerIndex['배정부서'] + 1).setValue(department);
      logAction('부서배정', { applicationId: applicationId, department: department });
      return { success: true };
    }
  }
  return { success: false, message: '신청서를 찾을 수 없습니다.' };
}

// ==================== 보고서 데이터 ====================
function getReportData(year) {
  // 자체 로그인 시스템 사용으로 권한 체크 생략
  
  const { data: appData, headerIndex: appHeader } = getSheetData(SHEETS.APPLICATIONS);
  const { data: scoringData, headerIndex: scoringHeader } = getSheetData(SHEETS.SCORING);
  
  // 해당 연도 지원자 필터링
  const applicants = [];
  const firstPass = [];
  const finalPass = [];
  
  for (let i = 0; i < appData.length; i++) {
    if (String(appData[i][appHeader['연도']]) === String(year)) {
      const app = {
        id: appData[i][appHeader['ID']],
        name: appData[i][appHeader['이름']] || '-',
        school: appData[i][appHeader['학교']] || '-',
        department: appData[i][appHeader['학과']] || '-',
        status: appData[i][appHeader['상태']] || '',
        assignedDepartment: appData[i][appHeader['배정부서']] || ''
      };
      
      applicants.push(app);
      
      if (app.status === '1차합격' || app.status === '최종합격') {
        firstPass.push(app);
      }
      
      if (app.status === '최종합격') {
        finalPass.push(app);
      }
    }
  }
  
  // 채점 데이터 수집
  const firstScoring = [];
  const secondScoring = [];
  
  for (let i = 0; i < scoringData.length; i++) {
    if (String(scoringData[i][scoringHeader['연도']]) === String(year)) {
      const appId = scoringData[i][scoringHeader['신청ID']];
      const stage = scoringData[i][scoringHeader['채점단계']];
      
      // 지원자 정보 찾기
      let applicantName = '-';
      let school = '-';
      for (let j = 0; j < appData.length; j++) {
        if (appData[j][appHeader['ID']] === appId) {
          applicantName = appData[j][appHeader['이름']] || '-';
          school = appData[j][appHeader['학교']] || '-';
          break;
        }
      }
      
      const scoringItem = {
        applicationId: appId,
        applicantName: applicantName,
        school: school,
        scorerName: scoringData[i][scoringHeader['채점자이름']] || '-',
        scores: [
          scoringData[i][scoringHeader['항목1점수']] || 0,
          scoringData[i][scoringHeader['항목2점수']] || 0,
          scoringData[i][scoringHeader['항목3점수']] || 0,
          scoringData[i][scoringHeader['항목4점수']] || 0,
          scoringData[i][scoringHeader['항목5점수']] || 0
        ],
        total: scoringData[i][scoringHeader['총점']] || 0
      };
      
      if (stage === '1차') {
        firstScoring.push(scoringItem);
      } else if (stage === '2차') {
        secondScoring.push(scoringItem);
      }
    }
  }
  
  // 최종합격자 평균 점수 계산
  finalPass.forEach(function(fp) {
    const first = firstScoring.filter(s => s.applicationId === fp.id);
    const second = secondScoring.filter(s => s.applicationId === fp.id);
    
    if (first.length > 0) {
      fp.firstAvg = Math.round(first.reduce((sum, s) => sum + s.total, 0) / first.length);
    }
    if (second.length > 0) {
      fp.secondAvg = Math.round(second.reduce((sum, s) => sum + s.total, 0) / second.length);
    }
  });
  
  // 채점 데이터 지원자 이름순 정렬
  firstScoring.sort((a, b) => a.applicantName.localeCompare(b.applicantName, 'ko'));
  secondScoring.sort((a, b) => a.applicantName.localeCompare(b.applicantName, 'ko'));
  
  return {
    year: year,
    totalApplicants: applicants.length,
    firstPass: firstPass,
    finalPass: finalPass,
    firstScoring: firstScoring,
    secondScoring: secondScoring
  };
}

function getDepartments() { return DEPARTMENTS; }

// ==================== 파일 관련 ====================
function uploadFile(fileName, base64Data, mimeType, folderName) {
  try {
    const rootFolder = DriveApp.getFolderById(CONFIG.ROOT_FOLDER_ID);
    const yearFolders = rootFolder.getFoldersByName(String(new Date().getFullYear()));
    let targetFolder;
    if (yearFolders.hasNext()) {
      const yearFolder = yearFolders.next();
      if (folderName) { const subFolders = yearFolder.getFoldersByName(folderName); targetFolder = subFolders.hasNext() ? subFolders.next() : yearFolder.createFolder(folderName); }
      else targetFolder = yearFolder;
    } else {
      const newYearFolder = rootFolder.createFolder(String(new Date().getFullYear()));
      targetFolder = folderName ? newYearFolder.createFolder(folderName) : newYearFolder;
    }
    
    // base64 데이터에서 data URL prefix 제거
    var cleanBase64 = base64Data;
    if (base64Data.indexOf(',') !== -1) {
      cleanBase64 = base64Data.split(',')[1];
    }
    
    // base64 디코딩 (바이너리 파일용)
    var decoded = Utilities.base64Decode(cleanBase64);
    var blob = Utilities.newBlob(decoded, mimeType, fileName);
    var file = targetFolder.createFile(blob);
    
    // 파일 공유 설정 - 링크가 있는 모든 사용자가 볼 수 있도록
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return { success: true, fileId: file.getId(), fileName: fileName };
  } catch (error) { return { success: false, message: '파일 업로드 실패: ' + error.toString() }; }
}

function getFileDownloadUrl(fileId) { 
  try { 
    if (!fileId || fileId === 'undefined' || fileId === 'null') {
      return { success: false, message: '파일 정보가 없습니다.' };
    }
    
    // 파일 공유 설정 확인 및 설정
    try {
      const file = DriveApp.getFileById(fileId);
      const access = file.getSharingAccess();
      if (access !== DriveApp.Access.ANYONE && access !== DriveApp.Access.ANYONE_WITH_LINK) {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      }
    } catch (shareError) {
      console.log('파일 공유 설정 실패:', shareError);
      // 공유 설정 실패해도 URL은 반환 시도
    }
    
    return { success: true, url: 'https://drive.google.com/uc?export=download&id=' + fileId }; 
  } catch (error) { 
    console.error('getFileDownloadUrl error:', error);
    return { success: false, message: '파일을 찾을 수 없습니다.' }; 
  } 
}
function getFileViewUrl(fileId) { try { return 'https://drive.google.com/file/d/' + fileId + '/view'; } catch (error) { return null; } }

// 기존 파일 공유 설정 일괄 수정 (슈퍼바이저만 실행 가능)
function fixAllFilePermissions() {
  const email = getEmail();
  
  
  let fixed = 0;
  let failed = 0;
  
  // 실습서식 파일 공유 설정
  try {
    const { data, headerIndex } = getSheetData(SHEETS.FORMS);
    for (let i = 0; i < data.length; i++) {
      const fileId = data[i][headerIndex['파일ID']];
      if (fileId) {
        try {
          const file = DriveApp.getFileById(fileId);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          fixed++;
        } catch (e) {
          console.log('서식 파일 공유 설정 실패:', fileId, e);
          failed++;
        }
      }
    }
  } catch (e) {
    console.log('서식 시트 처리 오류:', e);
  }
  
  // 공지사항 파일 공유 설정
  try {
    const { data, headerIndex } = getSheetData(SHEETS.NOTICES);
    for (let i = 0; i < data.length; i++) {
      const fileId = data[i][headerIndex['파일ID']];
      if (fileId) {
        try {
          const file = DriveApp.getFileById(fileId);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          fixed++;
        } catch (e) {
          console.log('공지 파일 공유 설정 실패:', fileId, e);
          failed++;
        }
      }
    }
  } catch (e) {
    console.log('공지 시트 처리 오류:', e);
  }
  
  // 과제제출 파일 공유 설정
  try {
    const { data, headerIndex } = getSheetData(SHEETS.SUBMISSIONS);
    for (let i = 0; i < data.length; i++) {
      const fileId = data[i][headerIndex['파일ID']];
      if (fileId) {
        try {
          const file = DriveApp.getFileById(fileId);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          fixed++;
        } catch (e) {
          console.log('과제 파일 공유 설정 실패:', fileId, e);
          failed++;
        }
      }
    }
  } catch (e) {
    console.log('과제 시트 처리 오류:', e);
  }
  
  return { success: true, message: '파일 공유 설정 완료: ' + fixed + '개 성공, ' + failed + '개 실패' };
}

// ==================== 로그 ====================
function logAction(action, details) {
  try {
    const sheet = getSheet(SHEETS.LOGS, true);
    const email = Session.getActiveUser().getEmail();
    sheet.appendRow([generateId(), formatDate(new Date()), email, action, JSON.stringify(details), '']);
  } catch (e) { console.error('logAction error:', e); }
}

// ==================== 통계 ====================
function getApplicationStats(year) {
  try {
    const { data, headerIndex } = getSheetData(SHEETS.APPLICATIONS);
    const stats = { total: 0, pending: 0, firstPass: 0, finalPass: 0, rejected: 0 };
    for (let i = 0; i < data.length; i++) {
      if (data[i][headerIndex['연도']] == year) {
        stats.total++;
        const status = data[i][headerIndex['상태']];
        if (status === '접수완료') stats.pending++;
        else if (status === '1차합격') stats.firstPass++;
        else if (status === '최종합격') stats.finalPass++;
        else if (status === '불합격') stats.rejected++;
      }
    }
    return stats;
  } catch (error) { return { total: 0, pending: 0, firstPass: 0, finalPass: 0, rejected: 0 }; }
}
// ==================== 서식 템플릿 ====================
function getFormTemplate(templateType) {
  const templates = {
    // 별지6: 실습계약서
    'contract': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">실습 계약서</h2>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">1. 일반적 사항</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
  <tr><td style="width: 20%; background: #f5f5f5; padding: 10px; font-weight: bold;">실습기간</td><td style="padding: 10px;">20____년 ____월 ____일부터 20____년 ____월 ____일까지 총 20일</td></tr>
  <tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">실습시간</td><td style="padding: 10px;">총 20일 160시간</td></tr>
</table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">2. 실습의 목적, 목표 및 수행과제</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
  <tr style="background: #e8e8e8;"><th style="padding: 10px; width: 20%;">목적</th><th style="padding: 10px; width: 30%;">성과 목표</th><th style="padding: 10px; width: 50%;">산출 목표</th></tr>
  <tr><td rowspan="4" style="padding: 10px; vertical-align: top; font-size: 0.9em; color: #666;">* 실습을 통해 달성할 수 있는 아래의 내용들을 참고하여 목적 작성<br><br>#전문지식<br>#전문적 태도<br>#실천역량 개발<br>#사회복지 현장의 이해<br>#직업탐색</td><td style="padding: 10px; vertical-align: top;">1. (공통) 사례관리의 실천의 이해 및 실천역량 향상</td><td style="padding: 10px; vertical-align: top;">1-1. 예) 점검 및 평가 상담 2회 진행<br>1-2.</td></tr>
  <tr><td style="padding: 10px; vertical-align: top;">2. (공통) 프로그램 개발과 평가 이해 및 실천역량 향상</td><td style="padding: 10px; vertical-align: top;">2-1. 예) 프로그램 기획 및 계획서 작성 1회<br>2-2.</td></tr>
  <tr><td style="padding: 10px; vertical-align: top;">3. (공통) 지역복지 실천 이해 및 실천역량 향상</td><td style="padding: 10px; vertical-align: top;">3-1. 예) 주민만나기 및 지역탐색 활동보고서 작성 1회<br>3-2.</td></tr>
  <tr><td style="padding: 10px; vertical-align: top;">4. (개별) 개별목표 작성</td><td style="padding: 10px; vertical-align: top;">4-1.<br>4-2.</td></tr>
</table>
<p style="color: #666; font-size: 0.85em; margin-bottom: 20px;">※ 목표 및 세부수행과제는 개인별 가감 가능<br>※ 실습목적&목표 기반 개별과제 1~2가지 선정, 실습기간과 내용 고려하여 실현가능한 목표 수립</p>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">3. 실습생의 의무와 책임</h3>
<div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; font-size: 0.9em; line-height: 1.8;"><ul style="margin: 0; padding-left: 20px;"><li>실습기관 이용자에 대한 인격을 존중하는 태도로 대하며, 선입견과 편견을 갖지 않는다.</li><li>기관의 중요사항이나 실습 중 알게된 클라이언트에 대해서는 비밀보장의 원칙을 지켜야 한다.</li><li>실습기관의 이용자와 가급적 개인적인 관계를 갖지 않으며, 금품을 받아서는 안된다.</li><li>실습기관의 기물을 파손하거나 비품을 분실하지 않아야 한다.</li><li>실습기관의 운영방침이나 지시에 따라야 하며 분위기에 융합하도록 노력하여야 한다.</li><li>기관의 규범에 따라 복장에 유의하며 예의바른 태도와 정중한 언어를 사용한다.</li><li>실습시간을 엄수하며 결근, 조퇴, 지각 등은 사전에 실습지도자의 허가를 받는다.</li><li>실습일지 혹은 실습기록은 가능한 상세하게 기록하도록 노력한다.</li><li>항상 배우는 자세로 적극적으로 임한다.</li><li>실습지도감독 시간에 성실하게 임한다.</li><li>실습생 자신의 교육욕구와 관심에 대해 실습지도자와 자유롭게 의사를 교환한다.</li><li>실습업무와 관련된 갈등 문제를 실습지도자 또는 실습지도교수와 상의한다.</li></ul></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">4. 실습기관, 지도자의 의무와 책임</h3>
<div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; font-size: 0.9em; line-height: 1.8;"><ul style="margin: 0; padding-left: 20px;"><li>실습기관은 실습지도자가 실습을 지도하기에 충분한 여건을 조성한다.</li><li>실습공간의 확보 및 시설을 제공한다.</li><li>실습생 교육에 책임을 인식하고 있어야 한다.</li><li>실습교육계획을 수립하여야 한다.<ul style="margin-top: 5px;"><li>실습교육 이전에 실습지도 목적과 지도방침을 설정해 놓아야 한다.</li></ul></li><li>실습생의 욕구를 이해하고 이와 관련하여 적합한 교육을 할 수 있도록 준비한다.</li><li>실습교육 이전에 기관의 직원들에게 실습계획을 알리고 실습생을 소개시킨다.</li><li>실습생이 이론적인 개념을 현장에 연관하고 통합할 수 있도록 학습의 기회를 제공한다.</li><li>실습교육 목표에 부합하는 실습지도를 수행할 수 있도록 학교와 협조체계를 유지한다.</li><li>실습평가를 실시하여 실습교육에 대해 실습생과 토의한다.</li></ul></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">5. 학교, 실습지도교수의 의무와 책임</h3>
<div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; font-size: 0.9em; line-height: 1.8;"><ul style="margin: 0; padding-left: 20px;"><li>학교에서는 실습교육의 목적과 목표가 성취될 수 있도록 실습교육 전반에 대한 책임을 맡는다.</li><li>실습지도교수는 실습종료 후 실습교육 향상을 위해 실습기관에 대한 평가, 실습교육의 효과성을 평가하여 실습기관에 피드백을 제공한다.</li><li>실습지도교수는 실습생의 실습수행평가를 위하여 실습기간중 1회이상 실습기관을 방문한다.</li></ul></div>
<div style="border: 2px solid #333; padding: 20px; margin-top: 30px; background: #fafafa;"><p style="text-align: center; font-weight: bold; margin-bottom: 20px;">상기 사항을 성실하게 이행하여 실습을 진행하도록 하겠습니다.</p><p style="text-align: right; margin-bottom: 30px;">________년 ________월 ________일</p><table style="width: 100%; border-collapse: collapse;"><tr><td style="padding: 10px; width: 15%; font-weight: bold;">실습생</td><td style="padding: 10px;">________________대학교 ________________학과</td><td style="padding: 10px; width: 20%; text-align: right;">________________ (인)</td></tr><tr><td style="padding: 10px; font-weight: bold;">실습지도교수</td><td style="padding: 10px;">________________대학교 ________________학과</td><td style="padding: 10px; text-align: right;">________________ (인)</td></tr><tr><td style="padding: 10px; font-weight: bold;">실습지도기관</td><td style="padding: 10px;">'+ORG_CONFIG.ORG_NAME+'</td><td style="padding: 10px; text-align: right;">관장 '+ORG_CONFIG.ORG_DIRECTOR+' (인)</td></tr><tr><td style="padding: 10px; font-weight: bold;">실습지도자</td><td style="padding: 10px;"></td><td style="padding: 10px; text-align: right;">________________ (인)</td></tr></table></div>
`,

    // 별지3: 실습생 Profile
    'profile': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">실습생 Profile</h2>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">1. 인적사항</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">실습생명</td><td style="width: 18%; padding: 10px;"></td><td style="width: 12%; background: #f5f5f5; padding: 10px; font-weight: bold;">성별</td><td style="width: 18%; padding: 10px;"></td><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">생년월일</td><td style="width: 22%; padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">소속</td><td colspan="5" style="padding: 10px;">________대학교(원) ________전공 ____학년(학기)</td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">주소</td><td colspan="5" style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">전화번호</td><td colspan="2" style="padding: 10px;">집: </td><td colspan="3" style="padding: 10px;">핸드폰: </td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">E-mail</td><td colspan="5" style="padding: 10px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">2. 이수 전공과목</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px;">교과목명</th><th style="padding: 8px; width: 12%;">이수완료</th><th style="padding: 8px;">교과목명</th><th style="padding: 8px; width: 12%;">이수완료</th><th style="padding: 8px;">교과목명</th><th style="padding: 8px; width: 12%;">이수완료</th></tr><tr><td style="padding: 8px;">사회복지개론</td><td style="padding: 8px; text-align: center;">☐</td><td style="padding: 8px;">인간행동과 사회환경</td><td style="padding: 8px; text-align: center;">☐</td><td style="padding: 8px;">사회복지실천론</td><td style="padding: 8px; text-align: center;">☐</td></tr><tr><td style="padding: 8px;">사회복지실천기술론</td><td style="padding: 8px; text-align: center;">☐</td><td style="padding: 8px;">지역사회복지론</td><td style="padding: 8px; text-align: center;">☐</td><td style="padding: 8px;">사회복지정책론</td><td style="padding: 8px; text-align: center;">☐</td></tr><tr><td style="padding: 8px;">사회복지행정론</td><td style="padding: 8px; text-align: center;">☐</td><td style="padding: 8px;">사회복지법제론</td><td style="padding: 8px; text-align: center;">☐</td><td style="padding: 8px;">사회복지조사론</td><td style="padding: 8px; text-align: center;">☐</td></tr><tr><td style="padding: 8px;">프로그램개발과평가</td><td style="padding: 8px; text-align: center;">☐</td><td style="padding: 8px;">가족복지론</td><td style="padding: 8px; text-align: center;">☐</td><td style="padding: 8px;">아동복지론</td><td style="padding: 8px; text-align: center;">☐</td></tr><tr><td style="padding: 8px;">노인복지론</td><td style="padding: 8px; text-align: center;">☐</td><td style="padding: 8px;">장애인복지론</td><td style="padding: 8px; text-align: center;">☐</td><td style="padding: 8px;">정신건강론</td><td style="padding: 8px; text-align: center;">☐</td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">3. 경력</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px; width: 18%;">구분<br>(취업/실습/봉사)</th><th style="padding: 8px; width: 25%;">기관</th><th style="padding: 8px; width: 20%;">기간</th><th style="padding: 8px;">내용</th></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">4. 사회복지를 전공하게 된 동기</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">5. 실습 기관 선택 이유</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">6. 실습을 통해서 성취하고자 하는 목표</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">7. 실습을 마친 후 목표달성 정도를 파악할 수 있는 기준</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 20px;"><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">8. 사회복지를 실천하는데 있어 자신의 강점과 약점</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px; width: 50%;">1) 사회복지 지식 및 기술의 측면</th><th style="padding: 8px; width: 50%;">2) 개인적인 특성 측면</th></tr><tr><td style="padding: 15px; min-height: 100px; vertical-align: top;"><br><br><br></td><td style="padding: 15px; min-height: 100px; vertical-align: top;"><br><br><br></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">9. 취미 및 특기</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 60px; margin-bottom: 20px;"><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">10. 실습기관, 실습지도자 및 실습지도교수에게 바라는 점</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
`,

    // 별지8: 실습일지
    'daily_log': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">실습 일지</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">일자</td><td style="width: 35%; padding: 10px;">______년 ______월 ______일 (______요일)</td><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">실습지도자</td><td style="width: 35%; padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">실습생명</td><td style="padding: 10px;"></td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">실습담당교수</td><td style="padding: 10px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">실습일정 및 주요내용</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px; width: 15%;">시간</th><th style="padding: 8px;">실습내용</th></tr><tr><td style="padding: 10px; text-align: center;">09:00~10:00</td><td style="padding: 10px;"></td></tr><tr><td style="padding: 10px; text-align: center;">10:00~11:00</td><td style="padding: 10px;"></td></tr><tr><td style="padding: 10px; text-align: center;">11:00~12:00</td><td style="padding: 10px;"></td></tr><tr><td style="padding: 10px; text-align: center; background: #f9f9f9;">12:00~13:00</td><td style="padding: 10px; background: #f9f9f9;">점심시간</td></tr><tr><td style="padding: 10px; text-align: center;">13:00~14:00</td><td style="padding: 10px;"></td></tr><tr><td style="padding: 10px; text-align: center;">14:00~15:00</td><td style="padding: 10px;"></td></tr><tr><td style="padding: 10px; text-align: center;">15:00~16:00</td><td style="padding: 10px;"></td></tr><tr><td style="padding: 10px; text-align: center;">16:00~17:00</td><td style="padding: 10px;"></td></tr><tr><td style="padding: 10px; text-align: center;">17:00~18:00</td><td style="padding: 10px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">실습생 의견</h3>
<p style="color: #666; font-size: 0.9em; margin-bottom: 10px;">※ 오늘 실습을 통해 배운 점, 느낀 점, 어려웠던 점 등을 기술하세요.</p>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 180px; margin-bottom: 20px;"><br><br><br><br><br></div>
<h3 style="background: #fff3cd; padding: 8px; margin: 15px 0 10px;">슈퍼비전 (지도자 작성)</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px; background: #fffef5;"><br><br><br></div>
<table style="width: 100%; margin-top: 30px;"><tr><td style="width: 50%; text-align: center; padding: 10px;">작성자: _________________ (인)</td><td style="width: 50%; text-align: center; padding: 10px;">슈퍼바이저: _________________ (인)</td></tr></table>
`,
    // 별지9: 기관분석보고서
    'org_analysis': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">기관 분석 보고서</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">성명</td><td style="width: 35%; padding: 10px;"></td><td style="width: 20%; background: #f5f5f5; padding: 10px; font-weight: bold;">학교/학과/학년</td><td style="width: 30%; padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">슈퍼바이저</td><td colspan="3" style="padding: 10px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">1. 설립목적</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">2. 기관연혁</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">3. 규모 및 주요시설</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">4. 조직 및 인력현황</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">5. 재정구조</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">6. 주요사업</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 150px; margin-bottom: 20px;"><br><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">7. 자원현황</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">8. 기관에 대한 Comment</h3><p style="color: #666; font-size: 0.9em; margin-bottom: 10px;">※ 종합, 분석하여 사회복지기관으로서의 목적 달성을 위한 기관의 구조와 기능에 대한 종합적인 평가와 개선을 위한 제언을 기록하세요.</p><div style="border: 1px solid #ccc; padding: 15px; min-height: 180px; margin-bottom: 20px;"><br><br><br><br><br></div>
`,

    // 별지10: 지역사회분석보고서
    'community_analysis': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">지역사회 분석 보고서</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">성명</td><td style="width: 35%; padding: 10px;"></td><td style="width: 20%; background: #f5f5f5; padding: 10px; font-weight: bold;">학교/학과/학년</td><td style="width: 30%; padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">슈퍼바이저</td><td colspan="3" style="padding: 10px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">1. 지역사회의 지리적, 인구학적, 사회적 특징 분석</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 180px; margin-bottom: 20px;"><br><br><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">2. 지역사회의 역사 분석</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">3. 지역사회에 대한 평가</h3>
<h4 style="margin: 10px 0;">1) 지역사회에 대한 인상과 느낌</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 15px;"><br><br></div>
<h4 style="margin: 10px 0;">2) 지역사회의 강약점 분석</h4><table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;"><tr style="background: #e8e8e8;"><th style="padding: 8px; width: 50%;">강점</th><th style="padding: 8px; width: 50%;">약점</th></tr><tr><td style="padding: 15px; min-height: 100px; vertical-align: top;"><br><br><br></td><td style="padding: 15px; min-height: 100px; vertical-align: top;"><br><br><br></td></tr></table>
<h4 style="margin: 10px 0;">3) 지역사회의 주요 당면 문제점과 과제</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 15px;"><br><br><br></div>
<h4 style="margin: 10px 0;">4) 지역사회에 대한 기관 과제</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
`,

    // 별지12: 기타과제보고서
    'other_report': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">[과제명] 보고서</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">성명</td><td style="width: 35%; padding: 10px;"></td><td style="width: 20%; background: #f5f5f5; padding: 10px; font-weight: bold;">학교/학과/학년</td><td style="width: 30%; padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">슈퍼바이저</td><td colspan="3" style="padding: 10px;"></td></tr></table>
<p style="color: #666; font-size: 0.9em; margin-bottom: 20px;">※ 아래 내용은 자유롭게 작성하세요.</p>
<div style="border: 1px solid #ccc; padding: 20px; min-height: 500px;"><br><br><br><br><br><br><br><br><br><br></div>
`,

    // 별지13: 필독서 서평보고서
    'book_review': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">필독서 서평 보고서</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">성명</td><td style="width: 35%; padding: 10px;"></td><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">실습부서</td><td style="width: 35%; padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">슈퍼바이저</td><td style="padding: 10px;"></td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">작성일</td><td style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">도서명</td><td style="padding: 10px;"></td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">저자</td><td style="padding: 10px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">1. 책을 읽고 난 후 가장 인상 깊었던 문장이나 장면은 무엇인가요?</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">2. 이 책을 통해 새롭게 알게 된 점, 생각하게 된 점은 무엇인가요?</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">3. 사회복지 실천의 관점에서 이 책이 주는 시사점은 무엇인가요?</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">4. 이 책의 내용을 실습 현장 또는 향후 사회복지사로서의 실천에 어떻게 적용하고 싶은가요?</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">5. 이 책에 대해 비판적으로 바라보거나 더 알고 싶은 점이 있다면 적어보세요.</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
`,
    // 별지14: 실습중간평가서
    'mid_evaluation': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">실습 중간 평가서</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">실습생 성명</td><td style="width: 18%; padding: 10px;"></td><td style="width: 10%; background: #f5f5f5; padding: 10px; font-weight: bold;">소속</td><td style="padding: 10px;">________대학교 ________학과 ____학년</td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">실습기관</td><td style="padding: 10px;">'+ORG_CONFIG.ORG_NAME+'</td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">실습분야</td><td style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">실습기간</td><td style="padding: 10px;"></td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">실습지도자</td><td style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">실습내용</td><td colspan="3" style="padding: 10px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">1. 실습생 자기평가</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px;">평가 항목</th><th style="padding: 8px; width: 11%;">매우좋음</th><th style="padding: 8px; width: 11%;">좋음</th><th style="padding: 8px; width: 11%;">보통</th><th style="padding: 8px; width: 11%;">나쁨</th><th style="padding: 8px; width: 11%;">매우나쁨</th></tr><tr><td style="padding: 10px;">1) 성실성 (출석상황, 과제제출 상황 등)</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td></tr><tr><td style="padding: 10px;">2) 실습에 임하는 자세</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td></tr><tr><td style="padding: 10px;">3) 사회복지적 가치의 실현</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td></tr><tr><td style="padding: 10px;">4) 실습목표 달성여부</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td></tr><tr><td style="padding: 10px;">5) 실습지도자와의 관계</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td></tr><tr><td style="padding: 10px;">6) 실습생과의 관계</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td><td style="padding: 10px; text-align: center;">☐</td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">2. 실습목표에 대한 평가</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px; width: 15%;">성과목표</th><th style="padding: 8px; width: 18%;">산출목표</th><th style="padding: 8px;">달성 여부/정도 및 근거</th></tr><tr><td rowspan="2" style="padding: 10px; vertical-align: middle;">1. </td><td style="padding: 10px;">1-1.</td><td style="padding: 10px;"></td></tr><tr><td style="padding: 10px;">1-2.</td><td style="padding: 10px;"></td></tr><tr><td rowspan="2" style="padding: 10px; vertical-align: middle;">2. </td><td style="padding: 10px;">2-1.</td><td style="padding: 10px;"></td></tr><tr><td style="padding: 10px;">2-2.</td><td style="padding: 10px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">3. 실습수행상의 자세 및 노력 평가</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">4. 현재까지의 실습을 통해 배운 점 및 어려웠던 점</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">5. 남은 실습을 효과적으로 보내기 위한 계획</h3>
<h4 style="margin: 10px 0;">1) 특별한 관심이 필요하거나 변화되어야 할 점</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 15px;"><br><br></div>
<h4 style="margin: 10px 0;">2) 이를 해결하기 위한 방법</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 15px;"><br><br></div>
<h4 style="margin: 10px 0;">3) 남은 실습기간 동안 꼭 해보고 싶은 것</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 20px;"><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">6. 실습지도자 및 기관에 대한 건의사항</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
`,

    // 별지15: 실습종결평가서
    'final_evaluation': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">실습 종결 평가서</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">실습생 성명</td><td style="width: 18%; padding: 10px;"></td><td style="width: 10%; background: #f5f5f5; padding: 10px; font-weight: bold;">소속</td><td style="padding: 10px;">________대학교 ________학과 ____학년</td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">실습기관</td><td style="padding: 10px;">'+ORG_CONFIG.ORG_NAME+'</td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">실습분야</td><td style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">실습기간</td><td style="padding: 10px;"></td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">실습지도자</td><td style="padding: 10px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">1. 실습생 자기평가</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px;">평가 항목</th><th style="padding: 8px; width: 11%;">매우좋음</th><th style="padding: 8px; width: 11%;">좋음</th><th style="padding: 8px; width: 11%;">보통</th><th style="padding: 8px; width: 11%;">나쁨</th><th style="padding: 8px; width: 11%;">매우나쁨</th></tr><tr><td style="padding: 10px;">1) 성실성</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td></tr><tr><td style="padding: 10px;">2) 실습에 임하는 자세</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td></tr><tr><td style="padding: 10px;">3) 사회복지적 가치의 실현</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td></tr><tr><td style="padding: 10px;">4) 실습목표 달성여부</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td></tr><tr><td style="padding: 10px;">5) 실습지도자와의 관계</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td></tr><tr><td style="padding: 10px;">6) 실습생과의 관계</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td><td style="text-align: center;">☐</td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">2. 실습목표 달성에 대한 평가</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px; width: 15%;">성과목표</th><th style="padding: 8px; width: 18%;">산출목표</th><th style="padding: 8px;">달성 여부/정도 및 근거</th></tr><tr><td rowspan="2" style="padding: 10px; vertical-align: middle;">1. </td><td style="padding: 10px;">1-1.</td><td style="padding: 10px;"></td></tr><tr><td style="padding: 10px;">1-2.</td><td style="padding: 10px;"></td></tr><tr><td rowspan="2" style="padding: 10px; vertical-align: middle;">2. </td><td style="padding: 10px;">2-1.</td><td style="padding: 10px;"></td></tr><tr><td style="padding: 10px;">2-2.</td><td style="padding: 10px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">3. 실습지도에 대한 평가</h3>
<h4 style="margin: 10px 0;">1) 일정과 교육내용 전반에 대한 평가</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 15px;"><br><br></div>
<h4 style="margin: 10px 0;">2) 가장 좋았던 교육내용과 안좋았던 교육내용</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 15px;"><br><br></div>
<h4 style="margin: 10px 0;">3) 실습과제의 적절성</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 60px; margin-bottom: 15px;"><br></div>
<h4 style="margin: 10px 0;">4) 슈퍼비전</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 60px; margin-bottom: 20px;"><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">4. 전문성 개발에 대한 평가</h3>
<h4 style="margin: 10px 0;">1) 실습을 통해 얻은 사회복지 전문기술에 대한 평가</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 15px;"><br><br></div>
<h4 style="margin: 10px 0;">2) 실습을 통해 얻은 사회복지 현장에 대한 이해도 평가</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 20px;"><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">5. 실습생의 자아인식 평가</h3>
<h4 style="margin: 10px 0;">1) 실습을 통해 발견된 자신의 강점과 약점</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 15px;"><br><br></div>
<h4 style="margin: 10px 0;">2) 실습을 통해 변화되고 성장된 점</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 15px;"><br><br></div>
<h4 style="margin: 10px 0;">3) 실습을 통해서 느낀 사회복지사에 대한 인식</h4><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 20px;"><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">6. 실습지도자에게 하고 싶은 말</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
`,
    // 사례관리 상담기록지
    'case_counseling': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">사례관리 상담 기록지</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">사례명(가명)</td><td style="width: 25%; padding: 10px;"></td><td style="width: 10%; background: #f5f5f5; padding: 10px; font-weight: bold;">성별</td><td style="width: 15%; padding: 10px;"></td><td style="width: 12%; background: #f5f5f5; padding: 10px; font-weight: bold;">생년월일</td><td style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">가족유형</td><td style="padding: 10px;"></td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">경제유형</td><td colspan="3" style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">일시</td><td style="padding: 10px;"></td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">상담자</td><td colspan="3" style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">방법</td><td colspan="5" style="padding: 10px;">☐ 내방 &nbsp;&nbsp; ☐ 방문 &nbsp;&nbsp; ☐ 전화</td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">주요내용</h3><p style="color: #666; font-size: 0.9em; margin-bottom: 10px;">※ 상담진행 과정 및 내용을 간략히 기록하세요.</p><div style="border: 1px solid #ccc; padding: 15px; min-height: 180px; margin-bottom: 20px;"><br><br><br><br><br></div>
<h3 style="background: #d4edda; padding: 8px; margin: 15px 0 10px;">잘했던 점</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 20px;"><br><br></div>
<h3 style="background: #fff3cd; padding: 8px; margin: 15px 0 10px;">보완할 점</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 20px;"><br><br></div>
<h3 style="background: #f8d7da; padding: 8px; margin: 15px 0 10px;">어려웠던 점</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 20px;"><br><br></div>
<h3 style="background: #cce5ff; padding: 8px; margin: 15px 0 10px;">궁금했던 점 & 슈퍼비전 요청사항</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
`,

    // 사례관리 과정 기록지
    'case_process_record': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">사례관리 상담 기록지</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
<tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">사례명(가명)</td><td style="width: 25%; padding: 10px;"></td><td style="width: 10%; background: #f5f5f5; padding: 10px; font-weight: bold;">성별</td><td style="width: 15%; padding: 10px;"></td><td style="width: 12%; background: #f5f5f5; padding: 10px; font-weight: bold;">생년월일</td><td style="padding: 10px;"></td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">가족유형</td><td style="padding: 10px;"></td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">경제유형</td><td colspan="3" style="padding: 10px;"></td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">상담자</td><td style="padding: 10px;"></td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">일시</td><td colspan="3" style="padding: 10px;"></td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">방법</td><td colspan="5" style="padding: 10px;">☐ 내방 &nbsp;&nbsp; ☐ 방문 &nbsp;&nbsp; ☐ 전화</td></tr>
</table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">주요내용</h3>
<p style="color: #666; font-size: 0.9em; margin-bottom: 10px;">※ 상담진행 과정 및 내용(간략히)</p>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 200px; margin-bottom: 20px;"><br><br><br><br><br><br></div>
<h3 style="background: #d4edda; padding: 8px; margin: 15px 0 10px;">잘했던 점</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 20px;"><br><br></div>
<h3 style="background: #fff3cd; padding: 8px; margin: 15px 0 10px;">보완할 점</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 20px;"><br><br></div>
<h3 style="background: #f8d7da; padding: 8px; margin: 15px 0 10px;">어려웠던 점</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 20px;"><br><br></div>
<h3 style="background: #cce5ff; padding: 8px; margin: 15px 0 10px;">궁금했던 점 & 슈퍼비전 요청사항</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
`,

    // 사례관리활동 평가서
    'case_activity_eval': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">사례관리활동 평가서</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
<tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">작성자</td><td style="padding: 10px;"></td></tr>
</table>

<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">1. 사례관리 교육 개요</h3>
<div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 20px;">
<p><strong>사전교육:</strong> 해결중심실천기술, 사례관리 매뉴얼, 점검 및 평가상담 오리엔테이션</p>
<p><strong>실습:</strong> 점검 및 평가상담 2회(무료급식 서비스 이용 어르신)</p>
<p><strong>교육 및 슈퍼비전:</strong> 점검 및 평가상담 슈퍼비전 2회</p>
</div>

<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">2. 점검 및 평가상담 개요</h3>
<h4 style="margin: 10px 0;">1) 사례개요</h4>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
<tr style="background: #e8e8e8;"><th style="padding: 8px;">사례관리단계</th><th style="padding: 8px;">대상자명</th><th style="padding: 8px; width: 8%;">연령</th><th style="padding: 8px;">가족유형</th><th style="padding: 8px;">경제유형</th><th style="padding: 8px;">일시</th><th style="padding: 8px;">장소</th><th style="padding: 8px;">비고</th></tr>
<tr><td style="padding: 10px;">점검 및 평가<br>(경로식당 사례)</td><td style="padding: 10px;"></td><td style="padding: 10px;"></td><td style="padding: 10px;"></td><td style="padding: 10px;"></td><td style="padding: 10px;"></td><td style="padding: 10px;"></td><td style="padding: 10px;"></td></tr>
<tr><td style="padding: 10px;">점검 및 평가<br>(경로식당 사례)</td><td style="padding: 10px;"></td><td style="padding: 10px;"></td><td style="padding: 10px;"></td><td style="padding: 10px;"></td><td style="padding: 10px;"></td><td style="padding: 10px;"></td><td style="padding: 10px;"></td></tr>
</table>

<h4 style="margin: 10px 0;">2) 세부내용</h4>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
<tr style="background: #e8e8e8;"><th style="padding: 8px; width: 20%;">사례관리단계</th><th style="padding: 8px; width: 50%;">주요 내용</th><th style="padding: 8px;">제언<br>(주요내용 및 사회복지사 의견 외 제안)</th></tr>
<tr><td style="padding: 10px; vertical-align: top;">점검 및 평가<br>(경로식당 사례)</td><td style="padding: 10px; vertical-align: top; font-size: 0.9em;">∎기본현황<br><br>∎제공서비스 점검 및 평가<br><br>∎클라이언트의 변화<br><br>∎사회복지사 종합의견</td><td style="padding: 10px;"></td></tr>
<tr><td style="padding: 10px; vertical-align: top;">점검 및 평가<br>(경로식당 사례)</td><td style="padding: 10px; vertical-align: top; font-size: 0.9em;">∎기본현황<br><br>∎제공서비스 점검 및 평가<br><br>∎클라이언트의 변화<br><br>∎사회복지사 종합의견</td><td style="padding: 10px;"></td></tr>
</table>

<h3 style="background: #d4edda; padding: 8px; margin: 15px 0 10px;">3. 사례관리실천의 가치와 기술</h3>
<p style="color: #666; font-size: 0.9em; margin-bottom: 10px;">※ 내가 배운, 내가 생각하는 사례관리실천의 가치와 기술</p>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>

<h3 style="background: #fff3cd; padding: 8px; margin: 15px 0 10px;">4. 사례관리자로서 나의 강점</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>

<h3 style="background: #cce5ff; padding: 8px; margin: 15px 0 10px;">5. 슈퍼비전 받고 싶은 내용</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
`,

    // 점검 및 평가 기록지 (무료급식/서비스사례)
    'case_eval_meal': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">(서비스사례) 점검 및 평가 기록지</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
<tr><td style="width: 18%; background: #f5f5f5; padding: 10px; font-weight: bold;">사례접수일</td><td style="width: 32%; padding: 10px;">______년 ____월 ____일</td><td style="width: 18%; background: #f5f5f5; padding: 10px; font-weight: bold;">일시</td><td style="padding: 10px;">______년 ____월 ____일</td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">서비스시작일</td><td style="padding: 10px;">______년 ____월 ____일</td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">작성자</td><td style="padding: 10px;"></td></tr>
</table>

<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">클라이언트 기본 현황</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
<tr><td style="width: 12%; background: #f5f5f5; padding: 10px; font-weight: bold;">성명</td><td style="width: 20%; padding: 10px;"></td><td style="width: 12%; background: #f5f5f5; padding: 10px; font-weight: bold;">성별</td><td style="width: 15%; padding: 10px;">☐남 ☐여</td><td style="width: 10%; background: #f5f5f5; padding: 10px; font-weight: bold;">나이</td><td style="width: 12%; padding: 10px;"></td><td style="width: 8%; background: #f5f5f5; padding: 10px; font-weight: bold;">생년월일</td><td style="padding: 10px;"></td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">주소</td><td colspan="3" style="padding: 10px;"></td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">연락처</td><td colspan="3" style="padding: 10px;">집전화: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 휴대전화:</td></tr>
</table>

<h4 style="margin: 10px 0; color: #333;">기본현황</h4>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
<tr><td style="width: 18%; background: #f5f5f5; padding: 10px; font-weight: bold;">세대유형·가족사항</td><td colspan="3" style="padding: 10px;">☐한부모(모자,부자세대) ☐부모자녀세대 ☐독거노인 ☐노인부부세대 ☐3세대 ☐장애인세대 ☐기타<br>★비상연락망:</td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">경제유형·경제사항</td><td colspan="3" style="padding: 10px;">☐일반수급자 ☐조건부수급자 ☐법정모부자가정 ☐저소득 ☐일반 ☐기타<br>수입원: 근로소득(　)원, 정부보조금(　)원, 후원금(　)원, 기타(　)원</td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">주거사항</td><td style="padding: 10px;">☐자가 ☐전세(　만원) ☐월세(보증금　만원/월　만원) ☐기타</td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">주거유형</td><td style="padding: 10px;">☐지하 ☐옥탑 ☐기타(　)</td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">강점 및 자원</td><td colspan="3" style="padding: 10px;"><strong>강점:</strong><br><br><strong>자원:</strong></td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">건강상황</td><td colspan="3" style="padding: 10px;">거동: ☐스스로 보행 가능 ☐보행 보조기 사용(　)<br>세부상황(최근 1년 이내 건강 상황의 변화):<br><br>기타사항: (주요병원:　) (요양보호사 ☐ / 횟수시간: 주　회,　~　)</td></tr>
</table>

<h3 style="background: #d4edda; padding: 8px; margin: 15px 0 10px;">제공서비스 점검 및 평가</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
<tr style="background: #e8e8e8;"><th style="padding: 8px; width: 12%;">서비스명</th><th style="padding: 8px; width: 15%;">서비스내용</th><th style="padding: 8px;">제공서비스 점검 및 평가<br>(서비스가 계획대로 잘 제공되었는지, 서비스제공결과가 어떤지 등)</th><th style="padding: 8px; width: 12%;">목표달성정도<br>(10점척도)</th></tr>
<tr><td style="padding: 10px;">무료급식</td><td style="padding: 10px;">☐경로식당<br>☐도시락<br>☐밑반찬</td><td style="padding: 10px;"></td><td style="padding: 10px; text-align: center;">/10</td></tr>
<tr><td style="padding: 10px;">일상생활</td><td style="padding: 10px;">☐이불세탁<br>☐방충망/방풍막</td><td style="padding: 10px;"></td><td style="padding: 10px; text-align: center;">/10</td></tr>
<tr><td style="padding: 10px;">경제지원</td><td style="padding: 10px;">☐식료품(김치,쌀 등)<br>☐기타 후원품</td><td style="padding: 10px;"></td><td style="padding: 10px; text-align: center;">/10</td></tr>
<tr><td style="padding: 10px;">정서지원</td><td style="padding: 10px;">☐생신잔치</td><td style="padding: 10px;"></td><td style="padding: 10px; text-align: center;">/10</td></tr>
</table>

<h3 style="background: #fff3cd; padding: 8px; margin: 15px 0 10px;">클라이언트의 변화</h3>
<p style="color: #666; font-size: 0.9em; margin-bottom: 10px;">※ 클라이언트의 역량강화측면, 긍정적 환경변화 측면, 고려해야 할 변화요인 등</p>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>

<h3 style="background: #cce5ff; padding: 8px; margin: 15px 0 10px;">사회복지사 종합 의견</h3>
<p style="color: #666; font-size: 0.9em; margin-bottom: 10px;">※ 점검 및 평가 결과에 대한 사회복지사 의견 기술</p>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>

<table border="1" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
<tr><td style="width: 20%; background: #f5f5f5; padding: 10px; font-weight: bold;">점검 및 평가 결과</td><td style="padding: 10px;">☐ 유지 &nbsp;&nbsp; ☐ 종결 &nbsp;&nbsp; ☐ 기타 (　)</td><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">관리수준</td><td style="padding: 10px;">☐ 상 &nbsp;&nbsp; ☐ 중 &nbsp;&nbsp; ☐ 하</td></tr>
</table>
`,

    // 점검 및 평가 기록지 (단순사례)
    'case_eval_simple': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">(단순사례) 점검 및 평가 기록지</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
<tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">사례접수일</td><td style="width: 20%; padding: 10px;">____년 __월 __일</td><td style="width: 12%; background: #f5f5f5; padding: 10px; font-weight: bold;">작성일</td><td style="width: 18%; padding: 10px;">____년 __월 __일</td><td style="width: 12%; background: #f5f5f5; padding: 10px; font-weight: bold;">작성자</td><td style="padding: 10px;"></td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">서비스시작일</td><td colspan="5" style="padding: 10px;">____년 __월 __일</td></tr>
</table>

<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">클라이언트 기본 현황</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
<tr><td style="width: 12%; background: #f5f5f5; padding: 10px; font-weight: bold;">성명</td><td style="width: 18%; padding: 10px;"></td><td style="width: 10%; background: #f5f5f5; padding: 10px; font-weight: bold;">성별</td><td style="width: 15%; padding: 10px;">☐남 ☐여</td><td style="width: 10%; background: #f5f5f5; padding: 10px; font-weight: bold;">나이</td><td style="width: 10%; padding: 10px;">세</td><td style="width: 10%; background: #f5f5f5; padding: 10px; font-weight: bold;">생년월일</td><td style="padding: 10px;"></td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">주소</td><td colspan="4" style="padding: 10px;"></td><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">연락처</td><td colspan="2" style="padding: 10px;">휴대전화:</td></tr>
</table>

<h4 style="margin: 10px 0; color: #333;">기본현황</h4>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
<tr><td style="width: 18%; background: #f5f5f5; padding: 10px; font-weight: bold;">세대유형·가족사항</td><td style="padding: 10px;">☐한부모(모자,부자세대) ☐부모자녀세대 ☐독거노인 ☐노인부부세대 ☐3세대 ☐장애인세대 ☐기타<br>가족관계, 동거가족, 비상연락망 등:</td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">경제유형·경제사항</td><td style="padding: 10px;">☐일반수급자 ☐조건부수급자 ☐법정모부자가정 ☐저소득 ☐일반 ☐기타<br>주요소득과 지출:</td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">주거사항</td><td style="padding: 10px;">☐자가 ☐전세(보증금액) ☐월세(보증금액/세) ☐기타</td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">강점 및 자원<br>- 내담자가 바라는 것</td><td style="padding: 10px;">☐기본생활 ☐교육·발달 ☐심리·정서 ☐건강 ☐안전 ☐경제 ☐가족관계 ☐사회적관계 ☐기타</td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">기타사항</td><td style="padding: 10px;"><br></td></tr>
</table>

<h3 style="background: #d4edda; padding: 8px; margin: 15px 0 10px;">제공서비스 점검 및 평가</h3>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
<tr style="background: #e8e8e8;"><th style="padding: 8px; width: 12%;">서비스명</th><th style="padding: 8px; width: 18%;">서비스내용</th><th style="padding: 8px;">제공서비스 점검 및 평가<br>(서비스가 계획대로 잘 제공되었는지, 서비스제공결과가 어떤지 등)</th><th style="padding: 8px; width: 12%;">목표달성정도<br>(10점척도)</th></tr>
<tr><td style="padding: 15px;"></td><td style="padding: 15px;"></td><td style="padding: 15px;"></td><td style="padding: 15px; text-align: center;">/10</td></tr>
<tr><td style="padding: 15px;"></td><td style="padding: 15px;"></td><td style="padding: 15px;"></td><td style="padding: 15px; text-align: center;">/10</td></tr>
</table>

<h3 style="background: #fff3cd; padding: 8px; margin: 15px 0 10px;">클라이언트의 변화</h3>
<p style="color: #666; font-size: 0.9em; margin-bottom: 10px;">※ 클라이언트의 역량강화측면, 긍정적 환경변화 측면, 고려해야 할 변화요인 등</p>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>

<h3 style="background: #cce5ff; padding: 8px; margin: 15px 0 10px;">사회복지사 종합 의견</h3>
<p style="color: #666; font-size: 0.9em; margin-bottom: 10px;">※ 점검 및 평가 결과에 대한 사회복지사 의견 기술</p>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>

<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
<tr><td style="width: 20%; background: #f5f5f5; padding: 10px; font-weight: bold;">점검 및 평가 결과</td><td style="padding: 10px;">☐ 유지 &nbsp;&nbsp; ☐ 종결 &nbsp;&nbsp; ☐ 기타 (　)</td><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">관리수준</td><td style="padding: 10px;">☐ 상 &nbsp;&nbsp; ☐ 중 &nbsp;&nbsp; ☐ 하</td></tr>
</table>

<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">개입배경 및 주요서비스 이력</h3>
<h4 style="margin: 10px 0;">개입배경</h4>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 15px;"><br><br></div>

<h4 style="margin: 10px 0;">주요서비스 이력</h4>
<p style="color: #666; font-size: 0.85em; margin-bottom: 10px;">※ 전체 서비스 연계 이력이 아닌 욕구에 기반한 '주요'이력만 작성 (ex. 주거이전, 무료급식 연계 등)</p>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
<tr style="background: #e8e8e8;"><th style="padding: 8px; width: 15%;">해당연도</th><th style="padding: 8px; width: 25%;">서비스명</th><th style="padding: 8px;">서비스 내용</th></tr>
<tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr>
<tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr>
<tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr>
</table>
`,

    // 프로그램 실행계획서
    'program_plan': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">○○○사업 실행계획서</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">사업명</td><td colspan="3" style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">성과목표</td><td colspan="3" style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">산출목표</td><td colspan="3" style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">일시</td><td style="width: 35%; padding: 10px;"></td><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">장소</td><td style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">대상</td><td colspan="3" style="padding: 10px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">준비과정</h3><table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px; width: 20%;">일시</th><th style="padding: 8px;">진행과정 및 내용</th><th style="padding: 8px; width: 20%;">수행인력</th></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">당일 진행일정</h3><table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px; width: 15%;">시간</th><th style="padding: 8px;">내용</th><th style="padding: 8px; width: 15%;">담당자</th><th style="padding: 8px; width: 20%;">비고(준비물 등)</th></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">역할분담</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 80px; margin-bottom: 20px;"><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">예산(자원)</h3><table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px; width: 15%;">세목</th><th style="padding: 8px; width: 30%;">지출항목</th><th style="padding: 8px; width: 20%;">금액</th><th style="padding: 8px;">산출근거</th></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr><tr><td colspan="2" style="padding: 12px; text-align: right; font-weight: bold;">소계</td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr></table><p style="color: #666; font-size: 0.9em;">※ 물품구매 시, 활용가능한 보유물품 확인, 지역 상점 구입 지향, 친환경 물품 고려 등</p>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">평가방법</h3><table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px; width: 20%;">성과목표</th><th style="padding: 8px; width: 20%;">성과지표</th><th style="padding: 8px; width: 15%;">자료원</th><th style="padding: 8px; width: 20%;">자료수집방법</th><th style="padding: 8px;">자료수집시기</th></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">첨부자료</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 60px; margin-bottom: 20px;"><br></div>
`,

    // 프로그램 실행결과보고서
    'program_result': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">○○○사업 실행결과보고서</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">사업명</td><td colspan="3" style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">성과목표</td><td colspan="3" style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">산출목표</td><td colspan="3" style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">일시</td><td style="width: 35%; padding: 10px;"></td><td style="width: 15%; background: #f5f5f5; padding: 10px; font-weight: bold;">장소</td><td style="padding: 10px;"></td></tr><tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">대상</td><td colspan="3" style="padding: 10px;"></td></tr></table>
<h3 style="background: #d4edda; padding: 8px; margin: 15px 0 10px;">성과평가</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #fff3cd; padding: 8px; margin: 15px 0 10px;">과정평가</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #cce5ff; padding: 8px; margin: 15px 0 10px;">참여자평가</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">예산(자원)</h3><table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr style="background: #e8e8e8;"><th style="padding: 8px;">예산액(원)</th><th style="padding: 8px;">집행액(원)</th><th style="padding: 8px;">집행율(%)</th><th style="padding: 8px;">차이원인</th><th style="padding: 8px;">향후 개선방향</th></tr><tr><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td><td style="padding: 12px;"></td></tr></table>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">관련사진</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 150px; margin-bottom: 20px; text-align: center;"><p style="color: #999;">사진을 첨부하세요</p></div>
<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">향후 방향 & 계획</h3><div style="border: 1px solid #ccc; padding: 15px; min-height: 120px; margin-bottom: 20px;"><br><br><br></div>
`,

    // 프로그램 종합평가서
    'program_eval': `
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">프로그램 종합평가서</h2>
<table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
<tr><td style="width: 18%; background: #f5f5f5; padding: 10px; font-weight: bold;">실습생명</td><td style="padding: 10px;"></td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">프로그램명</td><td style="padding: 10px;"></td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">대상</td><td style="padding: 10px;"></td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">일시</td><td style="padding: 10px;"></td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">장소</td><td style="padding: 10px;"></td></tr>
<tr><td style="background: #f5f5f5; padding: 10px; font-weight: bold;">성과목표</td><td style="padding: 10px;"></td></tr>
</table>

<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">프로그램 주요내용</h3>
<p style="color: #666; font-size: 0.9em; margin-bottom: 10px;">※ 개요식으로 작성</p>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 150px; margin-bottom: 20px;"><br><br><br><br></div>

<h3 style="background: #d4edda; padding: 8px; margin: 15px 0 10px;">잘했던 점</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>

<h3 style="background: #fff3cd; padding: 8px; margin: 15px 0 10px;">보완할 점</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>

<h3 style="background: #f8d7da; padding: 8px; margin: 15px 0 10px;">어려웠던 점</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>

<h3 style="background: #cce5ff; padding: 8px; margin: 15px 0 10px;">궁금했던 점 & 슈퍼비전 요청사항</h3>
<div style="border: 1px solid #ccc; padding: 15px; min-height: 100px; margin-bottom: 20px;"><br><br><br></div>
`,

    // 별지2: 개인정보 수집·이용 동의서
    'privacy_consent': `
<h2 style="text-align: center; margin-bottom: 10px; font-size: 1.3em;">&lt;별지 2&gt;</h2>
<h2 style="text-align: center; margin-bottom: 20px; font-size: 1.5em;">실습생 개인정보 수집·이용 동의서</h2>

<div style="border: 1px solid #ccc; padding: 20px; margin-bottom: 20px; background: #fafafa; line-height: 1.8;">
<p>- 작성하신 신청서는 <strong>'+ORG_CONFIG.ORG_NAME+' 사회복지 현장실습 신청자의 선정심사</strong>만을 위해 사용됩니다.</p>
<p style="margin-top: 10px;">- '+ORG_CONFIG.ORG_NAME+'은 실습생 선정에 활용하기 위하여 아래와 같이 개인정보를 수집·이용하고자 하며, 관련사항은 개인정보보호법 등 관계 법령에 따라 처리됨을 알려드리오니 아래의 각 사항을 확인하시고 동의 또는 거부하시기 바랍니다.</p>
</div>

<div style="border: 2px solid #333; padding: 20px; margin-bottom: 20px; background: #fff;">
<p style="margin-bottom: 15px;">본인은 「개인정보 보호법」 제15조(개인정보의 수집·이용), 제24조(고유식별정보의 처리 제한)에 따라 아래와 같이 개인정보 수집·이용에 대해 동의합니다.</p>

<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">1. [수집·이용 목적]</h3>
<div style="padding: 10px 15px; background: #f9f9f9; margin-bottom: 15px;">
'+ORG_CONFIG.ORG_NAME+' 사회복지현장실습 지원자 선정심사
</div>

<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">2. [수집·이용 항목]</h3>
<div style="padding: 10px 15px; background: #f9f9f9; margin-bottom: 15px;">
이름, 생년월일, 주소, 전화번호, 이메일주소, 학력, 병역, 자격면허, 경력사항(소속, 직위, 근무기간, 업무내용 등), 직무관련 활동 등
</div>

<h3 style="background: #f0f7ff; padding: 8px; margin: 15px 0 10px;">3. [보유 및 이용 기간]</h3>
<div style="padding: 10px 15px; background: #f9f9f9; margin-bottom: 15px;">
<p>1) 수집기간 : '+ORG_CONFIG.ORG_NAME+' 사회복지현장실습 모집시(공고일 ~ 마감일)까지</p>
<p>2) 보유 및 이용기간 : 모집 공고일부터 실습 종료시까지</p>
</div>
</div>

<h3 style="background: #fff3cd; padding: 8px; margin: 15px 0 10px;">[수집·이용 동의여부]</h3>
<div style="border: 1px solid #ccc; padding: 20px; margin-bottom: 20px; background: #fffef5;">
<p>- 위와 같이 본인의 개인정보를 수집·이용하는 것에 동의합니다.</p>
<p style="color: #666; font-size: 0.9em; margin-top: 10px;">(개인정보의 제공에 동의하지 않을 권리가 있으며, 동의를 거부할 경우 실습신청 접수가 불가합니다).</p>
</div>

<div style="border: 2px solid #333; padding: 20px; margin-top: 30px; background: #fafafa;">
<p style="text-align: center; font-weight: bold; margin-bottom: 20px; font-size: 1.1em;">위 내용에 동의합니다.</p>
<table style="width: 100%; margin-top: 20px;">
<tr>
<td style="width: 50%; padding: 10px; text-align: right;">지원자 성명 :</td>
<td style="width: 30%; padding: 10px; border-bottom: 1px solid #333;"></td>
<td style="width: 20%; padding: 10px;">(서명)</td>
</tr>
</table>
</div>
`
  };
  
  return templates[templateType] || null;
}

// ==================== 디버그 함수 ====================
function debugCheckData() {
  const email = Session.getActiveUser().getEmail();
  const result = {
    email: email,
    isTestAccount: isTestAccount(email),
    isSupervisor: isSupervisor(email),
    appStatus: getMyApplicationStatus(),
    settings: getSettings(),
    currentYear: new Date().getFullYear(),
    configSpreadsheetId: CONFIG.SPREADSHEET_ID
  };
  
  // 스프레드시트 정보 확인
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    result.spreadsheetName = ss.getName();
    result.spreadsheetUrl = ss.getUrl();
    result.sheetNames = ss.getSheets().map(s => s.getName());
  } catch (e) {
    result.spreadsheetError = e.toString();
  }
  
  // 공지사항 데이터 확인
  try {
    const { data, headerIndex, headers } = getSheetData(SHEETS.NOTICES);
    result.notices = {
      sheetName: SHEETS.NOTICES,
      count: data ? data.length : 0,
      headers: headers,
      headersWithIndex: Object.keys(headerIndex).map(k => k + ':' + headerIndex[k]),
      sampleData: data && data.length > 0 ? {
        id: data[0][headerIndex['ID']],
        title: data[0][headerIndex['제목']],
        target: data[0][headerIndex['대상']],
        targetType: typeof data[0][headerIndex['대상']],
        targetLength: String(data[0][headerIndex['대상']] || '').length,
        targetTrimmed: String(data[0][headerIndex['대상']] || '').trim(),
        targetColIndex: headerIndex['대상']
      } : null
    };
    
    // 직접 테스트 - D열(인덱스 3)이 대상인지 확인
    if (data && data.length > 0) {
      result.notices.rawRow = {
        col0: data[0][0],
        col1: data[0][1],
        col2: data[0][2],
        col3: data[0][3],
        col4: data[0][4]
      };
    }
    
    // getNotices 함수 직접 테스트
    result.notices.testGetNotices = getNotices(1, 10, '실습생');
    result.notices.testGetNoticesAll = getNotices(1, 10, null);
  } catch (e) {
    result.noticesError = e.toString();
  }
  
  // 출석부 데이터 확인
  try {
    const { data, headerIndex, headers } = getSheetData(SHEETS.ATTENDANCE);
    result.attendance = {
      sheetName: SHEETS.ATTENDANCE,
      count: data ? data.length : 0,
      headers: headers,
      sampleData: data && data.length > 0 ? {
        id: data[0][headerIndex['ID']],
        year: data[0][headerIndex['연도']],
        yearType: typeof data[0][headerIndex['연도']],
        date: String(data[0][headerIndex['날짜']]),
        name: data[0][headerIndex['이름']]
      } : null
    };
    
    // 출석부 조회 테스트
    const currentYear = new Date().getFullYear();
    const today = formatDateOnly(new Date());
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const startDate = formatDateOnly(monthAgo);
    
    result.attendance.testGetAllAttendance = getAllAttendance(currentYear, startDate, today);
    result.attendance.testGetMyAttendance = getMyAttendance(startDate, today);
    result.attendance.testParams = { year: currentYear, startDate: startDate, endDate: today, email: email };
    
    // 날짜 형식 상세 확인
    if (data && data.length > 0) {
      const dateVal = data[0][headerIndex['날짜']];
      result.attendance.dateDetail = {
        raw: dateVal,
        type: typeof dateVal,
        isDate: dateVal instanceof Date,
        asString: String(dateVal),
        formatted: dateVal instanceof Date ? formatDateOnly(dateVal) : String(dateVal)
      };
    }
  } catch (e) {
    result.attendanceError = e.toString();
  }
  
  // 과제제출 데이터 확인
  try {
    const { data, headerIndex, headers } = getSheetData(SHEETS.SUBMISSIONS);
    result.submissions = {
      sheetName: SHEETS.SUBMISSIONS,
      count: data ? data.length : 0,
      headers: headers,
      sampleData: data && data.length > 0 ? {
        id: data[0][headerIndex['ID']],
        year: data[0][headerIndex['연도']],
        yearType: typeof data[0][headerIndex['연도']],
        name: data[0][headerIndex['이름']],
        title: data[0][headerIndex['제목']]
      } : null
    };
  } catch (e) {
    result.submissionsError = e.toString();
  }
  
  return result;
}

// 테스트 함수
function testAttendance() {
  console.log('=== testAttendance 시작 ===');
  
  const email = Session.getActiveUser().getEmail();
  console.log('현재 사용자:', email);
  console.log('테스트 계정 여부:', isTestAccount(email));
  console.log('슈퍼바이저 여부:', isSupervisor(email));
  
  const result = getAllAttendance(2026, '2026-01-01', '2026-02-28');
  console.log('getAllAttendance 결과 개수:', result ? result.length : 'null');
  console.log('getAllAttendance 결과:', JSON.stringify(result));
  
  const students = getFinalStudents();
  console.log('getFinalStudents 결과 개수:', students ? students.length : 'null');
  console.log('getFinalStudents 결과:', JSON.stringify(students));
  
  console.log('=== testAttendance 완료 ===');
  return { attendanceCount: result ? result.length : 0, studentsCount: students ? students.length : 0 };
}

// ==================== 디버깅 함수 ====================
function testLoginStudent() {
  // 슈퍼바이저 시트 확인
  const svData = getSheetData(SHEETS.SUPERVISORS);
  console.log('슈퍼바이저 시트 헤더:', Object.keys(svData.headerIndex));
  console.log('슈퍼바이저 데이터 수:', svData.data.length);
  if (svData.data.length > 0) {
    console.log('첫 번째 슈퍼바이저:', JSON.stringify(svData.data[0]));
  }
  
  // 신청서 시트 확인
  const appData = getSheetData(SHEETS.APPLICATIONS);
  console.log('신청서 시트 헤더:', Object.keys(appData.headerIndex));
  console.log('신청서 데이터 수:', appData.data.length);
  
  return {
    supervisorHeaders: Object.keys(svData.headerIndex),
    supervisorCount: svData.data.length,
    applicationHeaders: Object.keys(appData.headerIndex),
    applicationCount: appData.data.length
  };
}
