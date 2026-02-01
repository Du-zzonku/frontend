import type { Model } from './types';

export const models: Model[] = [
  {
    id: 'v4-engine',
    name: 'V4 Engine',
    nameKo: 'V4 실린더 엔진',
    description: '4기통 엔진의 구조와 작동 원리를 학습합니다',
    parts: [
      {
        id: 'engine-block',
        name: 'Engine Block',
        nameKo: '엔진 블록',
        role: '엔진의 기본 구조체로, 실린더와 크랭크케이스를 포함하며 모든 부품을 지지합니다',
        material: '주철 또는 알루미늄 합금',
        explodeOffset: [0, 0, 0],
      },
      {
        id: 'piston',
        name: 'Piston',
        nameKo: '피스톤',
        role: '실린더 내에서 상하 운동하며 연소 압력을 크랭크샤프트로 전달합니다',
        material: '알루미늄 합금',
        explodeOffset: [0, 1.5, 0],
      },
      {
        id: 'crankshaft',
        name: 'Crankshaft',
        nameKo: '크랭크샤프트',
        role: '피스톤의 왕복 운동을 회전 운동으로 변환합니다',
        material: '단조강',
        explodeOffset: [0, -1.5, 0],
      },
      {
        id: 'connecting-rod',
        name: 'Connecting Rod',
        nameKo: '커넥팅 로드',
        role: '피스톤과 크랭크샤프트를 연결하여 동력을 전달합니다',
        material: '단조강',
        explodeOffset: [0.8, 0.5, 0],
      },
      {
        id: 'camshaft',
        name: 'Camshaft',
        nameKo: '캠샤프트',
        role: '밸브의 개폐 타이밍을 제어합니다',
        material: '주철 또는 단조강',
        explodeOffset: [0, 2, 0.5],
      },
      {
        id: 'valve',
        name: 'Valve',
        nameKo: '밸브',
        role: '흡기와 배기 가스의 흐름을 제어합니다',
        material: '내열강',
        explodeOffset: [0, 2.5, 0],
      },
    ],
    systemPrompt: `당신은 SIMVEX의 공학 교육 어시스턴트입니다. 현재 사용자는 V4 실린더 엔진을 학습하고 있습니다.

V4 엔진은 4개의 실린더가 V자 형태로 배치된 내연기관입니다. 주요 작동 원리:
1. 흡입 행정: 피스톤이 하강하며 공기-연료 혼합물 흡입
2. 압축 행정: 피스톤이 상승하며 혼합물 압축
3. 폭발 행정: 점화 플러그에 의한 연소로 피스톤 하강
4. 배기 행정: 피스톤 상승으로 연소 가스 배출

학생들에게 친절하고 명확하게 설명해주세요. 한국어로 답변하세요.`,
  },
  {
    id: 'drone',
    name: 'Drone',
    nameKo: '쿼드콥터 드론',
    description: '쿼드콥터 드론의 구성 요소와 비행 원리',
    parts: [
      {
        id: 'frame',
        name: 'Frame',
        nameKo: '프레임',
        role: '드론의 기본 구조체로 모든 부품을 지지합니다',
        material: '탄소섬유 복합재',
        explodeOffset: [0, 0, 0],
      },
      {
        id: 'motor',
        name: 'Motor',
        nameKo: '모터',
        role: '프로펠러를 회전시켜 추력을 생성합니다',
        material: '알루미늄, 구리 코일, 네오디뮴 자석',
        explodeOffset: [1.2, 0.5, 1.2],
      },
      {
        id: 'propeller',
        name: 'Propeller',
        nameKo: '프로펠러',
        role: '회전하며 공기를 밀어내어 양력을 생성합니다',
        material: '탄소섬유 또는 플라스틱',
        explodeOffset: [1.5, 1.5, 1.5],
      },
      {
        id: 'flight-controller',
        name: 'Flight Controller',
        nameKo: '비행 컨트롤러',
        role: 'IMU 센서 데이터를 바탕으로 자세를 제어합니다',
        material: 'PCB, 전자부품',
        explodeOffset: [0, -0.8, 0],
      },
      {
        id: 'battery',
        name: 'Battery',
        nameKo: '배터리',
        role: '드론에 전력을 공급합니다',
        material: '리튬 폴리머',
        explodeOffset: [0, -1.5, 0],
      },
      {
        id: 'esc',
        name: 'ESC',
        nameKo: 'ESC (전자변속기)',
        role: '모터의 속도를 제어합니다',
        material: 'PCB, MOSFET',
        explodeOffset: [0.8, -0.3, 0.8],
      },
    ],
    systemPrompt: `당신은 SIMVEX의 공학 교육 어시스턴트입니다. 현재 사용자는 쿼드콥터 드론을 학습하고 있습니다.

드론의 비행 원리:
- 4개의 모터가 프로펠러를 회전시켜 양력 생성
- 대각선 모터는 같은 방향, 인접 모터는 반대 방향 회전
- 모터 속도 차이로 롤, 피치, 요 제어
- 비행 컨트롤러의 PID 제어로 안정적 비행

학생들에게 친절하고 명확하게 설명해주세요. 한국어로 답변하세요.`,
  },
  {
    id: 'robot-arm',
    name: 'Robot Arm',
    nameKo: '6축 로봇팔',
    description: '6축 산업용 로봇팔의 구조와 동작 원리',
    parts: [
      {
        id: 'base',
        name: 'Base',
        nameKo: '베이스',
        role: '로봇팔의 기초로, 바닥에 고정되어 전체를 지지합니다',
        material: '주철',
        explodeOffset: [0, -1, 0],
      },
      {
        id: 'shoulder',
        name: 'Shoulder Joint',
        nameKo: '어깨 관절',
        role: '1축과 2축 회전을 담당합니다',
        material: '알루미늄 합금',
        explodeOffset: [0, 0, 0],
      },
      {
        id: 'upper-arm',
        name: 'Upper Arm',
        nameKo: '상완',
        role: '로봇팔의 주요 도달 거리를 제공합니다',
        material: '알루미늄 합금',
        explodeOffset: [0.5, 1, 0],
      },
      {
        id: 'elbow',
        name: 'Elbow Joint',
        nameKo: '팔꿈치 관절',
        role: '3축 회전으로 팔의 굽힘을 담당합니다',
        material: '알루미늄 합금',
        explodeOffset: [1, 1.5, 0],
      },
      {
        id: 'forearm',
        name: 'Forearm',
        nameKo: '전완',
        role: '손목까지의 연결부로 4축 회전 포함',
        material: '알루미늄 합금',
        explodeOffset: [1.5, 2, 0],
      },
      {
        id: 'wrist',
        name: 'Wrist',
        nameKo: '손목',
        role: '5축과 6축 회전으로 엔드이펙터 방향 제어',
        material: '알루미늄 합금',
        explodeOffset: [2, 2.5, 0],
      },
    ],
    systemPrompt: `당신은 SIMVEX의 공학 교육 어시스턴트입니다. 현재 사용자는 6축 산업용 로봇팔을 학습하고 있습니다.

6축 로봇팔의 특징:
- 6개의 회전 관절로 6 자유도(DOF) 구현
- 역기구학으로 목표 위치/자세에 필요한 관절 각도 계산
- 서보 모터와 감속기로 정밀한 위치 제어
- 주로 용접, 조립, 도장 등 산업 자동화에 사용

학생들에게 친절하고 명확하게 설명해주세요. 한국어로 답변하세요.`,
  },
  {
    id: 'robot-gripper',
    name: 'Robot Gripper',
    nameKo: '로봇 그리퍼',
    description: '로봇 집게 메커니즘의 구조',
    parts: [
      {
        id: 'gripper-body',
        name: 'Gripper Body',
        nameKo: '그리퍼 본체',
        role: '그리퍼의 주요 구조체로 구동 메커니즘을 포함합니다',
        material: '알루미늄 합금',
        explodeOffset: [0, 0, 0],
      },
      {
        id: 'finger-left',
        name: 'Left Finger',
        nameKo: '왼쪽 핑거',
        role: '물체를 집는 접촉면을 제공합니다',
        material: '알루미늄 또는 고무 코팅',
        explodeOffset: [-1, 0, 0],
      },
      {
        id: 'finger-right',
        name: 'Right Finger',
        nameKo: '오른쪽 핑거',
        role: '물체를 집는 접촉면을 제공합니다',
        material: '알루미늄 또는 고무 코팅',
        explodeOffset: [1, 0, 0],
      },
      {
        id: 'actuator',
        name: 'Actuator',
        nameKo: '액추에이터',
        role: '핑거를 열고 닫는 힘을 제공합니다',
        material: '공압 실린더 또는 전동 모터',
        explodeOffset: [0, -1, 0],
      },
    ],
    systemPrompt: `당신은 SIMVEX의 공학 교육 어시스턴트입니다. 현재 사용자는 로봇 그리퍼를 학습하고 있습니다.

그리퍼의 종류와 특징:
- 2핑거 그리퍼: 가장 일반적, 평행 또는 각도 방식
- 3핑거 그리퍼: 원형 물체에 적합
- 진공 그리퍼: 평면 물체 핸들링
- 소프트 그리퍼: 민감한 물체용

학생들에게 친절하고 명확하게 설명해주세요. 한국어로 답변하세요.`,
  },
  {
    id: 'suspension',
    name: 'Suspension',
    nameKo: '맥퍼슨 서스펜션',
    description: '차량 현가장치의 구조와 작동 원리',
    parts: [
      {
        id: 'strut',
        name: 'Strut Assembly',
        nameKo: '스트럿 어셈블리',
        role: '스프링과 쇼크업소버가 일체화된 구조로 충격을 흡수합니다',
        material: '강철',
        explodeOffset: [0, 1.5, 0],
      },
      {
        id: 'coil-spring',
        name: 'Coil Spring',
        nameKo: '코일 스프링',
        role: '노면 충격을 흡수하고 차체를 지지합니다',
        material: '스프링강',
        explodeOffset: [0, 2, 0],
      },
      {
        id: 'lower-arm',
        name: 'Lower Control Arm',
        nameKo: '로어 컨트롤 암',
        role: '휠을 차체에 연결하고 횡방향 힘을 지지합니다',
        material: '단조 알루미늄',
        explodeOffset: [0, -1, 0],
      },
      {
        id: 'knuckle',
        name: 'Steering Knuckle',
        nameKo: '스티어링 너클',
        role: '휠 허브를 지지하고 조향 회전축 역할을 합니다',
        material: '주철 또는 알루미늄',
        explodeOffset: [1, 0, 0],
      },
      {
        id: 'stabilizer',
        name: 'Stabilizer Bar',
        nameKo: '스태빌라이저 바',
        role: '코너링 시 차체 롤링을 감소시킵니다',
        material: '스프링강',
        explodeOffset: [0, 0, 1],
      },
    ],
    systemPrompt: `당신은 SIMVEX의 공학 교육 어시스턴트입니다. 현재 사용자는 맥퍼슨 서스펜션을 학습하고 있습니다.

맥퍼슨 서스펜션의 특징:
- 스트럿과 스프링이 일체화된 구조
- 공간 효율성이 뛰어나 전륜구동 차량에 널리 사용
- 구조가 단순하여 제조 비용 절감
- 조향 시 캠버 변화가 큼

학생들에게 친절하고 명확하게 설명해주세요. 한국어로 답변하세요.`,
  },
  {
    id: 'leaf-spring',
    name: 'Leaf Spring',
    nameKo: '판스프링',
    description: '판스프링 서스펜션 시스템의 구조',
    parts: [
      {
        id: 'main-leaf',
        name: 'Main Leaf',
        nameKo: '메인 리프',
        role: '가장 긴 판으로 아이 부싱을 통해 차체에 연결됩니다',
        material: '스프링강',
        explodeOffset: [0, 0.5, 0],
      },
      {
        id: 'helper-leaf',
        name: 'Helper Leaves',
        nameKo: '헬퍼 리프',
        role: '하중 증가 시 추가 스프링력을 제공합니다',
        material: '스프링강',
        explodeOffset: [0, 1, 0],
      },
      {
        id: 'center-bolt',
        name: 'Center Bolt',
        nameKo: '센터 볼트',
        role: '모든 리프를 중앙에서 고정합니다',
        material: '고강도 볼트강',
        explodeOffset: [0, 0, 0.5],
      },
      {
        id: 'u-bolt',
        name: 'U-Bolt',
        nameKo: 'U-볼트',
        role: '판스프링을 액슬에 고정합니다',
        material: '고강도강',
        explodeOffset: [0, -0.5, 0],
      },
      {
        id: 'shackle',
        name: 'Shackle',
        nameKo: '샤클',
        role: '스프링 길이 변화를 허용하며 차체에 연결합니다',
        material: '단조강',
        explodeOffset: [1.5, 0, 0],
      },
    ],
    systemPrompt: `당신은 SIMVEX의 공학 교육 어시스턴트입니다. 현재 사용자는 판스프링 서스펜션을 학습하고 있습니다.

판스프링의 특징:
- 여러 겹의 강판이 겹쳐진 구조
- 스프링과 서스펜션 링크 역할 동시 수행
- 높은 하중 용량으로 트럭, 버스에 주로 사용
- 판 사이 마찰로 자체 감쇠 효과

학생들에게 친절하고 명확하게 설명해주세요. 한국어로 답변하세요.`,
  },
  {
    id: 'machine-vice',
    name: 'Machine Vice',
    nameKo: '공작기계 바이스',
    description: '정밀 가공용 바이스의 구조와 원리',
    parts: [
      {
        id: 'vice-body',
        name: 'Vice Body',
        nameKo: '바이스 본체',
        role: '바이스의 기초 구조체로 기계 테이블에 고정됩니다',
        material: '주철',
        explodeOffset: [0, -0.5, 0],
      },
      {
        id: 'fixed-jaw',
        name: 'Fixed Jaw',
        nameKo: '고정 조',
        role: '공작물의 한쪽 면을 지지하는 고정된 조입니다',
        material: '공구강',
        explodeOffset: [-0.8, 0, 0],
      },
      {
        id: 'movable-jaw',
        name: 'Movable Jaw',
        nameKo: '이동 조',
        role: '스크류에 의해 이동하며 공작물을 클램핑합니다',
        material: '공구강',
        explodeOffset: [0.8, 0, 0],
      },
      {
        id: 'lead-screw',
        name: 'Lead Screw',
        nameKo: '리드 스크류',
        role: '핸들 회전을 조의 직선 운동으로 변환합니다',
        material: 'ACME 나사강',
        explodeOffset: [0, 0, -0.8],
      },
      {
        id: 'handle',
        name: 'Handle',
        nameKo: '핸들',
        role: '스크류를 회전시키는 손잡이입니다',
        material: '강철',
        explodeOffset: [0, 0, -1.5],
      },
    ],
    systemPrompt: `당신은 SIMVEX의 공학 교육 어시스턴트입니다. 현재 사용자는 공작기계 바이스를 학습하고 있습니다.

바이스의 특징:
- 리드 스크류의 나사 원리로 강한 클램핑력 발생
- ACME 나사는 사다리꼴 단면으로 높은 하중 전달
- 정밀 바이스는 ±0.01mm 정확도
- 스위블 베이스로 각도 조절 가능한 모델도 있음

학생들에게 친절하고 명확하게 설명해주세요. 한국어로 답변하세요.`,
  },
];

export function getModelById(id: string): Model | undefined {
  return models.find((m) => m.id === id);
}
