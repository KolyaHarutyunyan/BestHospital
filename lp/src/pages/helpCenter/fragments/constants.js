import { Images } from "assets";

export const MOBILE = 735;

// help-center-header-content
export const helpCenterHeaderContentTitle = "Advice and answers from the Wellness team.";
export const helpCenterHeaderContentSubtitle =
   "We would be glad to help you and discuss anything.";

// help-center-knowledge-base-content
export const knowledgeBaseTitle = "Knowledge base";
export const knowledgeBaseSubtitle =
   "Learn our articles and get help browse by category below";

// help-center-JSON
export const helpCenterJSON = [
   {
      title: "Billing",
      columns: ["Claims", "Invoices", "Postings"],
      info: [
         {
            rows: [
               {
                  icon: Images.Billing,
                  title: "Billing",
                  text: "The Billing Module is represented by a dollar icon, and is where users are able to manage employee time tracking, set up billing permissions and rates, submit claims, produce invoices and post payments.",
               },
               {
                  title: "Copay",
                  subtitle: "Billing",
                  text: "A copay is a fixed amount a client is responsible for paying for a health care service and is usually paid when the service is received. The amount can vary by the type of service. In CentralReach, the copay amount is included as part of the Patient Responsibility or PR AMT in the billing screens and client invoices.",
               },
               {
                  title: "Scheduling",
                  subtitle: "Billing",
                  text: "These employees also need to have permission to manage other employees’ calendars, which is enabled via the Scheduling module. Permissions to view or manage calendars can be established via Contact Forms, so new users added to CentralReach already have these permissions enabled based on your Contact Form.",
                  description: {
                     image: Images.ScheduleScreen,
                     details: {
                        title: "Enable Schedulers to Convert Other Employees’ Appointments",
                        detailList: [
                           "Can edit It is a long established fact that a reader will be distracte.",
                           "Can edit It is a long established fact that a reader will be distracte.",
                           "Can edit It is a long established fact that a reader will be distracte.",
                        ],
                     },
                  },
               },
            ],
         },
      ],
   },
   {
      title: "Staff",
      columns: ["Subtab 1", "Subtab 2", "Subtab 3"],
      info: [],
   },
   {
      title: "Scheduling",
      columns: ["Subtab 1", "Subtab 2"],
      info: [],
   },
   {
      title: "Funding Source",
      columns: ["Subtab 1", "Subtab 2", "Subtab 3", "Subtab 4", "Subtab 5"],
      info: [],
   },
   {
      title: "Client",
      columns: ["Subtab 1", "Subtab 2", "Subtab 3"],
      info: [],
   },
   {
      title: "Access Management",
      columns: ["Subtab 1", "Subtab 2"],
      info: [],
   },
];
