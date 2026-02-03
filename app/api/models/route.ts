import { NextResponse } from 'next/server';

import SuspensionData from '@/mocks/model/Suspension.json';
import V4EngineData from '@/mocks/model/V4_Engine.json';
import type { ModelData } from '@/types/model';

function generateDroneMockData(): ModelData {
  return {
    model: {
      modelId: 'drone',
      title: 'Drone',
      thumbnailUrl: '/models/Drone/조립도1.png',
      overview: '쿼드콥터 드론의 구성 요소와 비행 원리',
      theory:
        '4개의 모터가 프로펠러를 회전시켜 양력을 생성하고, 모터 속도 차이로 기체를 제어합니다.',
    },
    parts: [
      {
        partId: 'MAIN_FRAME',
        displayNameKo: '메인 프레임',
        glbUrl: '/models/Drone/Main frame.glb',
        summary: '드론의 기본 구조체로 모든 부품을 지지합니다',
      },
      {
        partId: 'MAIN_FRAME_MIR',
        displayNameKo: '메인 프레임 미러',
        glbUrl: '/models/Drone/Main frame_MIR.glb',
        summary: '메인 프레임의 대칭 구조입니다',
      },
      {
        partId: 'ARM_GEAR',
        displayNameKo: '암 기어',
        glbUrl: '/models/Drone/Arm gear.glb',
        summary: '팔 구동을 위한 기어 메커니즘입니다',
      },
      {
        partId: 'GEARING',
        displayNameKo: '기어링',
        glbUrl: '/models/Drone/Gearing.glb',
        summary: '동력 전달을 위한 기어 시스템입니다',
      },
      {
        partId: 'LEG',
        displayNameKo: '다리',
        glbUrl: '/models/Drone/Leg.glb',
        summary: '착륙 시 드론을 지지합니다',
      },
      {
        partId: 'IMPELLAR_BLADE',
        displayNameKo: '임펠러 블레이드',
        glbUrl: '/models/Drone/Impellar Blade.glb',
        summary: '공기를 밀어내어 추력을 생성합니다',
      },
      {
        partId: 'BEATER_DISC',
        displayNameKo: '비터 디스크',
        glbUrl: '/models/Drone/Beater disc.glb',
        summary: '로터 시스템의 일부로 회전력을 전달합니다',
      },
      {
        partId: 'NUT',
        displayNameKo: '너트',
        glbUrl: '/models/Drone/Nut.glb',
        summary: '부품을 고정하는 체결 요소입니다',
      },
      {
        partId: 'SCREW',
        displayNameKo: '나사',
        glbUrl: '/models/Drone/Screw.glb',
        summary: '부품을 체결하는 요소입니다',
      },
    ],
    nodes: [
      {
        nodeId: 'MAIN_FRAME_1',
        partId: 'MAIN_FRAME',
        parentNodeId: null,
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, 0, 0], distance: 0 },
      },
      {
        nodeId: 'MAIN_FRAME_MIR_1',
        partId: 'MAIN_FRAME_MIR',
        parentNodeId: 'MAIN_FRAME_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, 0, 0], distance: 0 },
      },
      {
        nodeId: 'ARM_GEAR_1',
        partId: 'ARM_GEAR',
        parentNodeId: 'MAIN_FRAME_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [1, 0.5, 1], distance: 0.5 },
      },
      {
        nodeId: 'GEARING_1',
        partId: 'GEARING',
        parentNodeId: 'MAIN_FRAME_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [1, 0.3, 1], distance: 0.3 },
      },
      {
        nodeId: 'LEG_1',
        partId: 'LEG',
        parentNodeId: 'MAIN_FRAME_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, -1, 0], distance: 0.5 },
      },
      {
        nodeId: 'IMPELLAR_BLADE_1',
        partId: 'IMPELLAR_BLADE',
        parentNodeId: 'MAIN_FRAME_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, 1, 0], distance: 0.8 },
      },
      {
        nodeId: 'BEATER_DISC_1',
        partId: 'BEATER_DISC',
        parentNodeId: 'MAIN_FRAME_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, 0.8, 0], distance: 0.5 },
      },
      {
        nodeId: 'NUT_1',
        partId: 'NUT',
        parentNodeId: 'MAIN_FRAME_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0.5, 0.5, 0.5], distance: 0.2 },
      },
      {
        nodeId: 'SCREW_1',
        partId: 'SCREW',
        parentNodeId: 'MAIN_FRAME_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0.3, 0.3, 0.3], distance: 0.2 },
      },
    ],
  };
}

function generateRobotArmMockData(): ModelData {
  return {
    model: {
      modelId: 'robot_arm',
      title: 'Robot Arm',
      thumbnailUrl: '/models/Robot Arm/로보팔 조립도.png',
      overview: '6축 산업용 로봇팔의 구조와 동작 원리',
      theory:
        '6개의 회전 관절로 6 자유도를 구현하며, 역기구학으로 목표 위치에 필요한 관절 각도를 계산합니다.',
    },
    parts: [
      {
        partId: 'BASE',
        displayNameKo: '베이스',
        glbUrl: '/models/Robot Arm/base.glb',
        summary: '로봇팔의 기초로, 바닥에 고정되어 전체를 지지합니다',
      },
      {
        partId: 'JOINT1',
        displayNameKo: '1축 관절',
        glbUrl: '/models/Robot Arm/Part2.glb',
        summary: '베이스 회전을 담당하는 첫 번째 관절입니다',
      },
      {
        partId: 'JOINT2',
        displayNameKo: '2축 관절',
        glbUrl: '/models/Robot Arm/Part3.glb',
        summary: '어깨 관절로 상하 운동을 담당합니다',
      },
      {
        partId: 'UPPER_ARM',
        displayNameKo: '상완',
        glbUrl: '/models/Robot Arm/Part4.glb',
        summary: '로봇팔의 주요 도달 거리를 제공합니다',
      },
      {
        partId: 'ELBOW',
        displayNameKo: '팔꿈치 관절',
        glbUrl: '/models/Robot Arm/Part5.glb',
        summary: '3축 회전으로 팔의 굽힘을 담당합니다',
      },
      {
        partId: 'FOREARM',
        displayNameKo: '전완',
        glbUrl: '/models/Robot Arm/Part6.glb',
        summary: '손목까지의 연결부로 4축 회전 포함',
      },
      {
        partId: 'WRIST',
        displayNameKo: '손목',
        glbUrl: '/models/Robot Arm/Part7.glb',
        summary: '5축과 6축 회전으로 엔드이펙터 방향 제어',
      },
      {
        partId: 'END_EFFECTOR',
        displayNameKo: '엔드이펙터',
        glbUrl: '/models/Robot Arm/Part8.glb',
        summary: '작업을 수행하는 말단 장치입니다',
      },
    ],
    nodes: [
      {
        nodeId: 'BASE_1',
        partId: 'BASE',
        parentNodeId: null,
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, -1, 0], distance: 0.3 },
      },
      {
        nodeId: 'JOINT1_1',
        partId: 'JOINT1',
        parentNodeId: 'BASE_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, 0, 0], distance: 0 },
      },
      {
        nodeId: 'JOINT2_1',
        partId: 'JOINT2',
        parentNodeId: 'JOINT1_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0.3, 0.5, 0], distance: 0.3 },
      },
      {
        nodeId: 'UPPER_ARM_1',
        partId: 'UPPER_ARM',
        parentNodeId: 'JOINT2_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0.6, 1, 0], distance: 0.3 },
      },
      {
        nodeId: 'ELBOW_1',
        partId: 'ELBOW',
        parentNodeId: 'UPPER_ARM_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0.9, 1.5, 0], distance: 0.3 },
      },
      {
        nodeId: 'FOREARM_1',
        partId: 'FOREARM',
        parentNodeId: 'ELBOW_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [1.2, 2, 0], distance: 0.3 },
      },
      {
        nodeId: 'WRIST_1',
        partId: 'WRIST',
        parentNodeId: 'FOREARM_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [1.5, 2.5, 0], distance: 0.3 },
      },
      {
        nodeId: 'END_EFFECTOR_1',
        partId: 'END_EFFECTOR',
        parentNodeId: 'WRIST_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [1.8, 3, 0], distance: 0.3 },
      },
    ],
  };
}

function generateRobotGripperMockData(): ModelData {
  return {
    model: {
      modelId: 'robot_gripper',
      title: '로봇 그리퍼 (Robot Gripper)',
      thumbnailUrl: '/models/Robot Gripper/로봇집게 조립도.png',
      overview:
        '기어-링크 메커니즘 기반의 로봇 그리퍼 조립/분해 시각화입니다. Blender에서 추출한 실제 3D 변환(위치/회전/스케일)을 그대로 사용합니다.',
      theory:
        '베이스 플레이트를 기준으로 기어가 링크를 구동하고, 링크 끝단의 그리퍼가 물체를 파지합니다.',
    },
    parts: [
      {
        partId: 'Base_Plate',
        displayNameKo: '베이스 플레이트',
        glbUrl: '/models/Robot Gripper/Base Plate.glb',
        summary: '전체 조립의 기준이 되는 하부 플레이트',
      },
      {
        partId: 'Base_Mounting_bracket',
        displayNameKo: '마운팅 브래킷',
        glbUrl: '/models/Robot Gripper/Base Mounting bracket.glb',
        summary: '플레이트에 체결되는 고정부(장착 브래킷)',
      },
      {
        partId: 'Base_Gear',
        displayNameKo: '베이스 기어',
        glbUrl: '/models/Robot Gripper/Base Gear.glb',
        summary: '링크 구동을 전달하는 중심 기어(구동부)',
      },
      {
        partId: 'Gear_link_1',
        displayNameKo: '기어 링크 1',
        glbUrl: '/models/Robot Gripper/Gear link 1.glb',
        summary: '기어의 회전을 링크로 전달하는 연결 부품(좌측 계열)',
      },
      {
        partId: 'Gear_link_2',
        displayNameKo: '기어 링크 2',
        glbUrl: '/models/Robot Gripper/Gear link 2.glb',
        summary: '기어의 회전을 링크로 전달하는 연결 부품(우측 계열)',
      },
      {
        partId: 'Link_1',
        displayNameKo: '링크 1',
        glbUrl: '/models/Robot Gripper/Link.glb',
        summary: '기어 링크와 그리퍼를 연결하는 관절 링크(좌측)',
      },
      {
        partId: 'Link_2',
        displayNameKo: '링크 2',
        glbUrl: '/models/Robot Gripper/Link.glb',
        summary: '기어 링크와 그리퍼를 연결하는 관절 링크(우측)',
      },
      {
        partId: 'Gripper_1',
        displayNameKo: '그리퍼 1',
        glbUrl: '/models/Robot Gripper/Gripper.glb',
        summary: '물체를 파지하는 끝단 집게(좌측)',
      },
      {
        partId: 'Gripper_2',
        displayNameKo: '그리퍼 2',
        glbUrl: '/models/Robot Gripper/Gripper.glb',
        summary: '물체를 파지하는 끝단 집게(우측)',
      },
    ],
    nodes: [
      {
        nodeId: 'Base_Plate_NODE',
        partId: 'Base_Plate',
        parentNodeId: null,
        assembled: {
          pos: [0.0, 0.0, 0.0],
          // 원래 블렌더 추출값 (조립 상태 유지)
          quat: [0.70711, 0.0, 0.0, 0.70711],
          scale: [1, 1, 1],
        },
        explode: { dir: [0.0, 0.0, 0.0], distance: 0.0 },
      },
      {
        nodeId: 'Base_Mounting_bracket_NODE',
        partId: 'Base_Mounting_bracket',
        parentNodeId: 'Base_Plate',
        assembled: {
          pos: [-0.00955, 0.00307, -0.00582],
          quat: [-0.0, -0.71074, 0.0, 0.70345],
          scale: [1, 1, 1],
        },
        // 마운팅 브래킷: 뒤쪽 위로 분해
        explode: { dir: [-0.3, 0.8, -0.5], distance: 0.12 },
      },
      {
        nodeId: 'Base_Gear_NODE',
        partId: 'Base_Gear',
        parentNodeId: 'Base_Plate',
        assembled: {
          pos: [0.00741, -0.0078, 0.01763],
          quat: [0.70599, 0.70823, -0.00087, 0.00087],
          scale: [1, 1, 1],
        },
        // 베이스 기어: 위로 분해
        explode: { dir: [0.0, 1.0, 0.0], distance: 0.08 },
      },
      {
        nodeId: 'Gear_link_1_NODE',
        partId: 'Gear_link_1',
        parentNodeId: 'Base_Plate',
        assembled: {
          pos: [0.0138, 0.00179, 0.03711],
          quat: [-0.70929, 0.70486, -0.00626, 0.00622],
          scale: [1, 1, 1],
        },
        // 기어링크1: 왼쪽 위로 분해
        explode: { dir: [-0.6, 0.7, 0.4], distance: 0.1 },
      },
      {
        nodeId: 'Gear_link_2_NODE',
        partId: 'Gear_link_2',
        parentNodeId: 'Base_Plate',
        assembled: {
          pos: [-0.01326, 0.00275, 0.03747],
          quat: [-0.46906, -0.52884, -0.52791, 0.47076],
          scale: [1, 1, 1],
        },
        // 기어링크2: 오른쪽 위로 분해
        explode: { dir: [0.6, 0.7, 0.4], distance: 0.1 },
      },
      {
        nodeId: 'Link_1_NODE',
        partId: 'Link_1',
        parentNodeId: 'Base_Plate',
        assembled: {
          pos: [-0.00531, 0.00063, 0.0734],
          quat: [0.0, -0.0, -0.70711, 0.70711],
          scale: [1, 1, 1],
        },
        // 링크1: 왼쪽 아래로 분해
        explode: { dir: [-0.5, -0.3, 0.8], distance: 0.12 },
      },
      {
        nodeId: 'Link_2_NODE',
        partId: 'Link_2',
        parentNodeId: 'Base_Plate',
        assembled: {
          pos: [0.0049, 0.00063, 0.0736],
          quat: [0.0, -0.0, -0.70711, 0.70711],
          scale: [1, 1, 1],
        },
        // 링크2: 오른쪽 아래로 분해
        explode: { dir: [0.5, -0.3, 0.8], distance: 0.12 },
      },
      {
        nodeId: 'Gripper_1_NODE',
        partId: 'Gripper_1',
        parentNodeId: 'Base_Plate',
        assembled: {
          pos: [-0.00088, -0.00202, 0.08675],
          quat: [0.58378, -0.399, 0.40653, 0.57856],
          scale: [1, 1, 1],
        },
        // 그리퍼1: 왼쪽 앞으로 분해
        explode: { dir: [-0.4, -0.2, 0.9], distance: 0.15 },
      },
      {
        nodeId: 'Gripper_2_NODE',
        partId: 'Gripper_2',
        parentNodeId: 'Base_Plate',
        assembled: {
          pos: [0.00052, -0.00202, 0.08695],
          quat: [-0.40277, -0.58118, -0.58118, 0.40277],
          scale: [1, 1, 1],
        },
        // 그리퍼2: 오른쪽 앞으로 분해
        explode: { dir: [0.4, -0.2, 0.9], distance: 0.15 },
      },
    ],
  };
}

function generateLeafSpringMockData(): ModelData {
  return {
    model: {
      modelId: 'leaf_spring',
      title: 'Leaf Spring',
      thumbnailUrl: '/models/Leaf Spring/판스프링 조립도.png',
      overview: '판스프링 서스펜션 시스템의 구조',
      theory:
        '여러 겹의 강판이 겹쳐진 구조로 스프링과 서스펜션 링크 역할을 동시에 수행합니다.',
    },
    parts: [
      {
        partId: 'LEAF_LAYER',
        displayNameKo: '리프 레이어',
        glbUrl: '/models/Leaf Spring/Leaf-Layer.glb',
        summary: '여러 겹의 강판으로 하중을 분산시킵니다',
      },
      {
        partId: 'CLAMP_CENTER',
        displayNameKo: '센터 클램프',
        glbUrl: '/models/Leaf Spring/Clamp-Center.glb',
        summary: '리프 스프링 중앙을 고정합니다',
      },
      {
        partId: 'CLAMP_PRIMARY',
        displayNameKo: '프라이머리 클램프',
        glbUrl: '/models/Leaf Spring/Clamp-Primary.glb',
        summary: '주요 클램프로 리프를 고정합니다',
      },
      {
        partId: 'CLAMP_SECONDARY',
        displayNameKo: '세컨더리 클램프',
        glbUrl: '/models/Leaf Spring/Clamp-Secondary.glb',
        summary: '보조 클램프로 추가 고정합니다',
      },
      {
        partId: 'SUPPORT',
        displayNameKo: '서포트',
        glbUrl: '/models/Leaf Spring/Support.glb',
        summary: '판스프링을 차체에 연결하는 지지대입니다',
      },
      {
        partId: 'SUPPORT_CHASSIS',
        displayNameKo: '샤시 서포트',
        glbUrl: '/models/Leaf Spring/Support-Chassis.glb',
        summary: '샤시와 연결되는 서포트입니다',
      },
      {
        partId: 'SUPPORT_CHASSIS_RIGID',
        displayNameKo: '리지드 샤시 서포트',
        glbUrl: '/models/Leaf Spring/Support-Chassis Rigid.glb',
        summary: '강성이 높은 샤시 서포트입니다',
      },
      {
        partId: 'SUPPORT_RUBBER',
        displayNameKo: '러버 서포트',
        glbUrl: '/models/Leaf Spring/Support-Rubber.glb',
        summary: '진동을 흡수하는 고무 부싱입니다',
      },
      {
        partId: 'SUPPORT_RUBBER_60MM',
        displayNameKo: '60mm 러버 서포트',
        glbUrl: '/models/Leaf Spring/Support-Rubber 60mm.glb',
        summary: '60mm 사이즈의 고무 부싱입니다',
      },
    ],
    nodes: [
      {
        nodeId: 'LEAF_LAYER_1',
        partId: 'LEAF_LAYER',
        parentNodeId: null,
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, 0.5, 0], distance: 0.3 },
      },
      {
        nodeId: 'CLAMP_CENTER_1',
        partId: 'CLAMP_CENTER',
        parentNodeId: 'LEAF_LAYER_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, 0, 0.5], distance: 0.2 },
      },
      {
        nodeId: 'CLAMP_PRIMARY_1',
        partId: 'CLAMP_PRIMARY',
        parentNodeId: 'LEAF_LAYER_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [-1, 0, 0], distance: 0.3 },
      },
      {
        nodeId: 'CLAMP_SECONDARY_1',
        partId: 'CLAMP_SECONDARY',
        parentNodeId: 'LEAF_LAYER_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [1, 0, 0], distance: 0.3 },
      },
      {
        nodeId: 'SUPPORT_1',
        partId: 'SUPPORT',
        parentNodeId: 'LEAF_LAYER_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [1.5, 0, 0], distance: 0.3 },
      },
      {
        nodeId: 'SUPPORT_CHASSIS_1',
        partId: 'SUPPORT_CHASSIS',
        parentNodeId: 'LEAF_LAYER_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [-1.5, 0.3, 0], distance: 0.3 },
      },
      {
        nodeId: 'SUPPORT_CHASSIS_RIGID_1',
        partId: 'SUPPORT_CHASSIS_RIGID',
        parentNodeId: 'LEAF_LAYER_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [-1.5, -0.3, 0], distance: 0.3 },
      },
      {
        nodeId: 'SUPPORT_RUBBER_1',
        partId: 'SUPPORT_RUBBER',
        parentNodeId: 'SUPPORT_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [1.5, 0.5, 0], distance: 0.2 },
      },
      {
        nodeId: 'SUPPORT_RUBBER_60MM_1',
        partId: 'SUPPORT_RUBBER_60MM',
        parentNodeId: 'SUPPORT_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [1.5, -0.5, 0], distance: 0.2 },
      },
    ],
  };
}

function generateMachineViceMockData(): ModelData {
  return {
    model: {
      modelId: 'machine_vice',
      title: 'Machine Vice',
      thumbnailUrl: '/models/Machine Vice/공작 기계 바이스.jpg',
      overview: '정밀 가공용 바이스의 구조와 원리',
      theory:
        '리드 스크류의 나사 원리로 강한 클램핑력을 발생시켜 공작물을 고정합니다.',
    },
    parts: [
      {
        partId: 'BODY',
        displayNameKo: '본체',
        glbUrl: '/models/Machine Vice/Part1.glb',
        summary: '바이스의 기초 본체입니다',
      },
      {
        partId: 'GUIDE',
        displayNameKo: '가이드',
        glbUrl: '/models/Machine Vice/Part1 Fuhrung.glb',
        summary: '이동 조의 직선 운동을 안내합니다',
      },
      {
        partId: 'FIXED_JAW',
        displayNameKo: '고정 조',
        glbUrl: '/models/Machine Vice/Part2 Feste Backe.glb',
        summary: '공작물의 한쪽 면을 지지하는 고정된 조입니다',
      },
      {
        partId: 'MOVABLE_JAW',
        displayNameKo: '이동 조',
        glbUrl: '/models/Machine Vice/Part3-lose backe.glb',
        summary: '스크류에 의해 이동하며 공작물을 클램핑합니다',
      },
      {
        partId: 'SPINDLE_SOCKET',
        displayNameKo: '스핀들 소켓',
        glbUrl: '/models/Machine Vice/Part4 spindelsockel.glb',
        summary: '스핀들을 지지하는 소켓입니다',
      },
      {
        partId: 'CLAMPING_JAW',
        displayNameKo: '클램핑 조',
        glbUrl: '/models/Machine Vice/Part5-Spannbacke.glb',
        summary: '공작물을 직접 클램핑하는 부분입니다',
      },
      {
        partId: 'GUIDE_RAIL',
        displayNameKo: '가이드 레일',
        glbUrl: '/models/Machine Vice/Part6-fuhrungschiene.glb',
        summary: '이동 조가 미끄러지는 레일입니다',
      },
      {
        partId: 'TRAPEZOIDAL_SPINDLE',
        displayNameKo: '사다리꼴 스핀들',
        glbUrl: '/models/Machine Vice/Part7-TrapezSpindel.glb',
        summary: '핸들 회전을 조의 직선 운동으로 변환합니다',
      },
      {
        partId: 'BASE_PLATE',
        displayNameKo: '베이스 플레이트',
        glbUrl: '/models/Machine Vice/Part8-grundplatte.glb',
        summary: '바이스를 기계 테이블에 고정하는 플레이트입니다',
      },
      {
        partId: 'PRESSURE_SLEEVE',
        displayNameKo: '압력 슬리브',
        glbUrl: '/models/Machine Vice/Part9-Druckhulse.glb',
        summary: '스핀들의 축력을 전달하는 슬리브입니다',
      },
    ],
    nodes: [
      {
        nodeId: 'BODY_1',
        partId: 'BODY',
        parentNodeId: null,
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, 0, 0], distance: 0 },
      },
      {
        nodeId: 'GUIDE_1',
        partId: 'GUIDE',
        parentNodeId: 'BODY_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, 0.3, 0], distance: 0.2 },
      },
      {
        nodeId: 'FIXED_JAW_1',
        partId: 'FIXED_JAW',
        parentNodeId: 'BODY_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [-1, 0, 0], distance: 0.3 },
      },
      {
        nodeId: 'MOVABLE_JAW_1',
        partId: 'MOVABLE_JAW',
        parentNodeId: 'BODY_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [1, 0, 0], distance: 0.3 },
      },
      {
        nodeId: 'SPINDLE_SOCKET_1',
        partId: 'SPINDLE_SOCKET',
        parentNodeId: 'BODY_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [1.5, 0, 0], distance: 0.2 },
      },
      {
        nodeId: 'CLAMPING_JAW_1',
        partId: 'CLAMPING_JAW',
        parentNodeId: 'MOVABLE_JAW_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, 0.5, 0], distance: 0.2 },
      },
      {
        nodeId: 'GUIDE_RAIL_1',
        partId: 'GUIDE_RAIL',
        parentNodeId: 'BODY_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, -0.5, 0], distance: 0.2 },
      },
      {
        nodeId: 'TRAPEZOIDAL_SPINDLE_1',
        partId: 'TRAPEZOIDAL_SPINDLE',
        parentNodeId: 'BODY_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, 0, -1], distance: 0.3 },
      },
      {
        nodeId: 'BASE_PLATE_1',
        partId: 'BASE_PLATE',
        parentNodeId: null,
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, -1, 0], distance: 0.3 },
      },
      {
        nodeId: 'PRESSURE_SLEEVE_1',
        partId: 'PRESSURE_SLEEVE',
        parentNodeId: 'TRAPEZOIDAL_SPINDLE_1',
        assembled: { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1] },
        explode: { dir: [0, 0, -1.5], distance: 0.2 },
      },
    ],
  };
}

export const mockDataMap: Record<string, ModelData> = {
  v4_engine: V4EngineData as ModelData,
  suspension: SuspensionData as ModelData,
  drone: generateDroneMockData(),
  robot_arm: generateRobotArmMockData(),
  robot_gripper: generateRobotGripperMockData(),
  leaf_spring: generateLeafSpringMockData(),
  machine_vice: generateMachineViceMockData(),
};

interface ModelSummary {
  modelId: string;
  title: string;
  thumbnailUrl: string;
  overview: string;
}

export async function GET() {
  const models: ModelSummary[] = Object.values(mockDataMap).map((data) => ({
    modelId: data.model.modelId,
    title: data.model.title,
    thumbnailUrl: data.model.thumbnailUrl,
    overview: data.model.overview,
  }));

  return NextResponse.json(models);
}
