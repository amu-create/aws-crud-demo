# AWS CRUD Demo

Next.js + DynamoDB를 사용한 간단한 CRUD 애플리케이션입니다.

## 🚀 Live Demo
- GitHub: https://github.com/amu-create/aws-crud-demo
- 로컬 실행: `npm run dev`

## 📚 기술 스택
- **Frontend**: Next.js 14.2.3, React 18, TypeScript, Tailwind CSS
- **Backend**: AWS DynamoDB (NoSQL)
- **AWS Services**: DynamoDB, IAM
- **기타**: AWS SDK v3

## 🎯 주요 기능
- ✅ 아이템 생성 (Create)
- ✅ 아이템 조회 (Read)
- ✅ 아이템 수정 (Update)
- ✅ 아이템 삭제 (Delete)
- ✅ 실시간 상태 업데이트
- ✅ 반응형 UI

## 🛠️ 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.local.example`을 `.env.local`로 복사하고 AWS 자격 증명을 입력하세요.

```bash
cp .env.local.example .env.local
```

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 브라우저에서 확인
http://localhost:3000

## 🌐 AWS 설정

### DynamoDB 테이블
- **테이블명**: `aws-crud-demo-items`
- **파티션 키**: `id` (String)
- **빌링 모드**: On-Demand (PAY_PER_REQUEST)
- **리전**: us-east-1

### IAM 권한
필요한 DynamoDB 권한:
- PutItem
- GetItem
- DeleteItem
- Scan
- Query
- UpdateItem

## 💰 AWS 프리티어
- **DynamoDB**: 25GB 스토리지, 월 5천만 요청 무료 (영구)
- **테이블 개수**: 무제한
- **비용**: $0 (프리티어 내에서 운영)

## 🚀 배포 옵션

### Vercel 배포 (추천)
```bash
npm install -g vercel
vercel
```

### AWS Amplify 배포
1. Amplify 콘솔에서 새 앱 생성
2. GitHub 리포지토리 연결
3. 환경 변수 설정
4. 자동 배포

## 📁 프로젝트 구조
```
aws-crud-demo/
├── app/
│   ├── api/
│   │   └── items/
│   │       └── route.ts      # CRUD API 엔드포인트
│   ├── globals.css          # 전역 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 메인 페이지 UI
├── lib/
│   └── dynamodb.ts          # DynamoDB 클라이언트 설정
├── .env.local.example       # 환경변수 예시
├── package.json
└── README.md
```

## 📸 스크린샷
- 메인 화면: CRUD 작업 UI
- AWS DynamoDB 콘솔: 실시간 데이터 확인
- 반응형 디자인: 모바일/데스크탑 지원

## 🤝 Contributing
Issues와 Pull Requests는 언제나 환영합니다!

## 📄 License
MIT License
