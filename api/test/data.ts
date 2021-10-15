export const BASE_URL = 'http://localhost:8200/api/';
export const data = {
  funding: [
    {
      name: 's',
      type: 's',
      contact: 's',
      email: 'abhsashCdddDFG@gmail.com',
      website: 'd',
      phoneNumber: '+37477379237',
      address: {
        lat: 0,
        lng: 0,
        street: 'string',
        city: 'string',
        state: 'string',
        zip: 'string',
        country: 'string',
        formattedAddress: 'string',
      },
      status: 0,
    },
    {
      id: null,
      name: 'aaaaaaaaaaassssssssssssddddddddddddffffffffffffff',
      type: 's',
      contact: 's',
      email: 'abhhsdsacdsxCdddDFG@gmail.com',
      website: 'd',
      phoneNumber: '+37477379237',
      address: {
        lat: 0,
        lng: 0,
        street: 'string',
        city: 'string',
        state: 'string',
        zip: 'string',
        country: 'string',
        formattedAddress: 'string',
      },
      status: 0,
    },
  ],
  fundingService: [
    {
      funderId: null,
      id: '612e2b4543fc954ad068f356',
      name: 'string',
      globServiceId: null,
      rate: 0,
      cptCode: 0,
      size: 0,
      min: 0,
      max: 0,
    },
    {
      name: 'string',
      globServiceId: null,
      rate: 0,
      cptCode: 0,
      size: 0,
      min: 0,
      max: 0,
    },
  ],
  globalService: [
    {
      name: 'ok',
      displayCode: 'chokay',
      category: 'ha lav okay',
    },
    {
      name: null,
      displayCode: null,
      category: null,
    },
  ],
  modifier: [
    {
      modifiers: [
        {
          credentialId: null,
          chargeRate: 0,
          name: 'string',
          type: 0,
        },
        {
          credentialId: null,
          chargeRate: 10,
          name: 'eeeh',
          type: 0,
        },
      ],
      serviceId: null,
    },
  ],
  credential: [
    {
      name: 'a',
      type: 2,
    },
    {
      name: null,
      type: null,
    },
  ],
  department: [
    {
      name: 'department',
    },
    {
      name: null,
    },
  ],
  staff: [
    {
      password: 'dabndiwnudnaowind',
      firstName: 'A',
      middleName: 'A',
      lastName: 'A',
      email: 'Asss@gmail.com',
      secondaryEmail: 'B@gmail.com',
      phone: '+14845219791',
      secondaryPhone: '+14845219791',
      state: 'string',
      gender: 'string',
      birthday: '2021-09-12T08:05:11.088Z',
      residency: 'string',
      ssn: 0,
      address: {
        lat: 0,
        lng: 0,
        street: 'string',
        city: 'string',
        state: 'string',
        zip: 'string',
        country: 'string',
        formattedAddress: 'string',
      },
    },
    {
      password: 'dabndiwnudnaowind',
      firstName: 'B',
      middleName: 'B',
      lastName: 'B',
      email: 'B@gmail.com',
      secondaryEmail: 'B@gmail.com',
      phone: '+14845219791',
      secondaryPhone: '+14845219791',
      state: 'string',
      gender: 'string',
      birthday: '2021-09-12T08:05:11.088Z',
      residency: 'string',
      ssn: 0,
      address: {
        lat: 0,
        lng: 0,
        street: 'string',
        city: 'string',
        state: 'string',
        zip: 'string',
        country: 'string',
        formattedAddress: 'string',
      },
    },
  ],
  comment: [
    {
      text: 'Comment Create',
      subject: 'Comment SUbject',
      resource: null,
      onModel: 'Staff',
    },
    {
      text: 'Comment Create 1',
      subject: 'Comment SUbject',
      resource: null,
      onModel: null,
    },
  ],
  overtime: [
    {
      name: "dto.name",
      type: "DAILY",
      multiplier: 3,
      threshold: 10
    },
    {
      name: "dto.name",
      type: "dsds",
      multiplier: 3,
      threshold: 10
    },
    {
      name: "dto.name",
      type: "DAILY",
      multiplier: 3,
      threshold: 0
    },
  ],
  timesheet: [
    {
      staffId: null,
      payCode: null,
      description: "Something",
      hours: 10,
      startDate: "2021-10-15T09:39:09.822Z",
      endDate: "2021-10-15T09:39:09.822Z"
    },
    {
      staffId: 'dsds85',
      payCode: null,
      description: "Something",
      hours: 10,
      startDate: "2021-10-15T09:39:09.822Z",
      endDate: "2021-10-15T09:39:09.822Z"
    },
    {
      staffId: null,
      payCode: '456456ghg',
      description: "Something",
      hours: 10,
      startDate: "2021-10-15T09:39:09.822Z",
      endDate: "2021-10-15T09:39:09.822Z"
    }
  ],
  payCode: [
    {
      employmentId: null,
      payCodeTypeId: null,
      rate: 50,
      active: true,
      startDate: "2021-10-15T09:39:09.822Z"
    },
    {
      employmentId: 'fdfdf',
      payCodeTypeId: null,
      rate: 50,
      active: true,
      startDate: "2021-10-15T09:39:09.822Z"
    },
    {
      employmentId: null,
      payCodeTypeId: 'dsdsdsd',
      rate: 50,
      active: true,
      startDate: "2021-10-15T09:39:09.822Z"
    },
  ],
  payCodeType: [
    {
      name: "dto.name",
      code: "dto.code",
      type: "HOURLY",
      overtime: true,
      pto: true
    },
    {
      name: "dto.name",
      code: "dto.code",
      type: "Hourlygf",
      overtime: "dto.overtime",
      pto: "dto.pto"
    },
  ],
  employment: [
    {
      title: "string",
      staffId: null,
      departmentId: null,
      supervisor: null,
      startDate: "2021-10-15T10:45:41.052Z",
      endDate: "2021-10-15T10:45:41.052Z",
      active: true,
      schedule: 0,
      termination: {
        "reason": "string",
        "date": "2021-10-15T10:45:41.052Z"
      }
    },
    {
      title: "string",
      staffId: 'dsd',
      departmentId: null,
      supervisor: null,
      startDate: "2021-10-15T10:45:41.052Z",
      endDate: "2021-10-15T10:45:41.052Z",
      active: true,
      schedule: 0,
      termination: {
        "reason": "string",
        "date": "2021-10-15T10:45:41.052Z"
      }
    },
    {
      title: "string",
      staffId: null,
      departmentId: 'dfdf',
      supervisor: null,
      startDate: "2021-10-15T10:45:41.052Z",
      endDate: "2021-10-15T10:45:41.052Z",
      active: true,
      schedule: 0,
      termination: {
        "reason": "string",
        "date": "2021-10-15T10:45:41.052Z"
      }
    },
    {
      title: "string",
      staffId: null,
      departmentId: null,
      supervisor: 'fdfd',
      startDate: "2021-10-15T10:45:41.052Z",
      endDate: "2021-10-15T10:45:41.052Z",
      active: true,
      schedule: 0,
      termination: {
        "reason": "string",
        "date": "2021-10-15T10:45:41.052Z"
      }
    }
  ],
 
  permissions: [
    {
      title: 'ALL_ACCESS',
      description: 'Used for super admin',
      code: 0,
    },
    {
      title: 'MANAGE_ROLES',
      description: 'Used for users to manage role system',
      code: 1,
    },
    {
      title: 'MANAGE_ADMINS',
      description: 'Used for users to manage admins',
      code: 2,
    },
    {
      title: 'MANAGE_FUNDERS',
      description: 'Can create, delete and update funding sources related information',
      code: 3,
    },
    {
      title: 'MANAGE_CLIENTS',
      description: 'Can create, delete and update clients related information',
      code: 4,
    },
  ],
  roles: {
    SUPER_ADMIN: {
      title: 'SUPER_ADMIN',
      description: 'manage all endpoints',
      permissions: [],
    },
    MANAGE_AGENTS: {
      title: 'MANAGE_AGENTS',
      description: 'aaa',
      permissions: [],
    },
    MANAGE_OFFICE: {
      title: 'MANAGE_OFFICE',
      description: '000',
      permissions: [],
    },
  },
};
