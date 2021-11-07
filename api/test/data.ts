export const BASE_URL = 'http://localhost:8200/api/';
export const data = {
  enrollment: [
    {
      clientId: null,
      funderId: null,
      primary: true,
      startDate: "2021-11-07T15:28:04.892Z",
      terminationDate: "2021-11-07T15:28:04.892Z"
    },
    {
      clientId: null,
      funderId: null,
      primary: false,
      startDate: "2021-11-07T15:28:04.892Z",
      terminationDate: "2021-11-07T15:28:04.892Z"
    },
  ],
  client: [
    {
      firstName: "Jon",
      middleName: "Doe",
      lastName: "rondodo",
      code: "456",
      ethnicity: "string",
      language: "string",
      familyLanguage: "string",
      gender: "female",
      birthday: "2021-11-07T13:02:05.350Z",
      status: "INACTIVE"
    },
    {
      firstName: "Jon",
      middleName: "Doe",
      lastName: "rondodo",
      code: "456",
      ethnicity: "string",
      language: "string",
      familyLanguage: "string",
      gender: "female",
      birthday: "2021-11-07T13:02:05.350Z",
      status: "INACTIVE"
    }
  ],
  auth: [
    {
      clientId: null,
      funderId: null,
      authId: '54645',
      startDate: "2021-11-07T14:04:10.303Z",
      endDate: "2021-11-07T14:04:10.303Z",
      location: "string",
      status: 1,
    },
    {
      clientId: null,
      funderId: null,
      authId: null,
      startDate: "2021-11-07T14:04:10.303Z",
      endDate: "2021-11-07T14:04:10.303Z",
      location: "string",
      status: 0,
    }
  ],
  authService: [
    {
      authorizationId: null,
      fundingServiceId: null,
      total: 10,
      modifiers: []
    },
    {
      authorizationId: null,
      fundingServiceId: null,
      total: 10,
      modifiers: []
    }
  ],
  appointment: [
    {
      type: "SERVICE",
      client: null,
      authorizedService: null,
      staff: null,
      staffPayCode: null,
      startDate: '2021-11-07T12:19:20.703Z',
      startTime: '2021-11-07T12:19:20.703Z',
      endTime: '2021-11-07T12:19:20.703Z',
      eventStatus: "RENDERED",
      status: "ACTIVE",
      require: false,
      miles: 0,
      files: [
        "string"
      ]
    },
    {
      type: "dv",
      client: null,
      authorizedService: null,
      staff: null,
      staffPayCode: null,
      startDate: '2021-11-07T12:19:20.703Z',
      startTime: '2021-11-07T12:19:20.703Z',
      endTime: '2021-11-07T12:19:20.703Z',
      eventStatus: "RENDERED",
      status: "ACTIVE",
      require: false,
      miles: 0,
      files: [
        "string"
      ]
    }
  ],
  funding: [
    {
      name: "string",
      type: "string",
      contact: "string",
      email: "a@gmail.com",
      website: "string",
      phoneNumber: "+37477379237",
      address: "hi",
      status: "INACTIVE"
    },
    {
      name: "string",
      type: "string",
      contact: "string",
      email: "a@gmail.com",
      website: "string",
      phoneNumber: "+37477379237",
      address: "hi",
      status: 0
    }
  ],
  fundingService: [
    {
      name: "string",
      funderId: null,
      serviceId: null,
      rate: 0,
      cptCode: "string",
      size: 0,
      min: 0,
      max: 0
    },
    {
      name: "string",
      serviceId: null,
      funderId: null,
      rate: 0,
      cptCode: "string",
      size: 0,
      min: 0,
      max: 0
    }
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
        }
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
      name: "testPaycode",
      employmentId: null,
      payCodeTypeId: null,
      rate: 0,
      active: true,
      startDate: "2021-11-07T13:49:26.962Z",
      endDate: "2021-11-07T13:49:26.962Z"
    },
    {
      name: "testPaycode",
      employmentId: null,
      payCodeTypeId: null,
      rate: 0,
      active: true,
      startDate: "2021-11-07T13:49:26.962Z",
      endDate: "2021-11-07T13:49:26.962Z"
    }
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
