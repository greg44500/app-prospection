backend/
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   └── cors.js
│   │
│   ├── models/
│   │   ├── shared/
│   │   │   └── enums/
│   │   │
│   │   ├── auth/
│   │   │   ├── User.model.js
│   │   │   ├── RefreshToken.model.js
│   │   │   ├── Role.model.js
│   │   │   └── Permission.model.js
│   │   │
│   │   ├── organization/
│   │   │   ├── Organization.model.js
│   │   │   ├── Team.model.js
│   │   │   ├── TeamMember.model.js
│   │   │   └── AssignmentGroup.model.js
│   │   │
│   │   ├── billing/
│   │   │   ├── Plan.model.js
│   │   │   └── Subscription.model.js
│   │   │
│   │   ├── geo/
│   │   │   ├── Address.model.js
│   │   │   ├── MapPoint.model.js
│   │   │   ├── ProspectionZone.model.js
│   │   │   ├── ProspectionRoute.model.js
│   │   │   └── ProspectionExclusion.model.js
│   │   │
│   │   ├── prospection/
│   │   │   ├── ProspectionAssignment.model.js
│   │   │   ├── ProspectionVisit.model.js
│   │   │   ├── ProspectingCampaign.model.js
│   │   │   └── ProspectingAction.model.js
│   │   │
│   │   ├── external-data/
│   │   │   └── DpeRecord.model.js
│   │   │
│   │   ├── crm/
│   │   │   ├── Company.model.js
│   │   │   ├── Contact.model.js
│   │   │   └── Prospect.model.js
│   │   │
│   │   ├── communication/
│   │   │   ├── Notification.model.js
│   │   │   └── EmailTemplate.model.js
│   │   │
│   │   └── system/
│   │       ├── UserActivity.model.js
│   │       └── AuditLog.model.js
│   │
│   ├── controllers/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── requireRole.middleware.js
│   │   ├── requirePermission.middleware.js
│   │   ├── requireOwnership.middleware.js
│   │   ├── validate.middleware.js
│   │   ├── error.middleware.js
│   │   └── rateLimit.middleware.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── user.validator.js
│   │   ├── organization.validator.js
│   │   ├── team.validator.js
│   │   ├── subscription.validator.js
│   │   ├── prospect.validator.js
│   │   ├── contact.validator.js
│   │   ├── campaign.validator.js
│   │   ├── action.validator.js
│   │   │
│   │   └── common/
│   │       ├── date.validator.js
│   │       ├── objectId.validator.js
│   │       ├── pagination.validator.js
│   │       └── text.validator.js
│   │
│   └── utils/
│       ├── AppError.js
│       ├── catchAsync.js
│       ├── jwt.js
│       ├── crypto.js
│       ├── dates.js
│       ├── permissions.js
│       ├── ownership.js
│       ├── limits.js
│       ├── slugify.js
│       ├── sanitize.js
│       └── pagination.js
│
├── tests/
│
├── .env
├── package.json
└── README.md