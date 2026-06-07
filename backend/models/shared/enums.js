// ==============================
// AUTH
// ==============================

export const USER_STATUS = [
    'pending',
    'active',
    'suspended',
    'archived',
];

export const USER_PROVIDER = [
    'local',
    'google',
    'microsoft',
];


// ==============================
// ORGANIZATION
// ==============================

export const ORGANIZATION_STATUS = [
    'active',
    'suspended',
    'archived',
];

export const TEAM_MEMBER_STATUS = [
    'invited',
    'active',
    'suspended',
];


// ==============================
// BILLING
// ==============================

export const SUBSCRIPTION_STATUS = [
    'trialing',
    'active',
    'past_due',
    'canceled',
    'expired',
];

export const BILLING_PROVIDER = [
    'manual',
    'stripe',
];


// ==============================
// GEO
// ==============================

export const ADDRESS_SOURCE = [
    'manual',
    'ban_api',
    'import',
];

export const MAP_POINT_SOURCE = [
    'manual',
    'ban_api',
    'dpe_api',
    'cadastre_api',
    'import',
];

export const MAP_POINT_TYPE = [
    'address',
    'building',
    'dpe',
    'prospect',
    'custom',
];


// ==============================
// PROSPECTION
// ==============================

export const PROSPECTION_STATUS = [
    'draft',
    'planned',
    'in_progress',
    'completed',
    'canceled',
];

export const VISIT_STATUS = [
    'to_visit',
    'visited',
    'absent',
    'interested',
    'not_interested',
    'callback',
    'converted',
];

export const PROSPECTING_ACTION_TYPE = [
    'call',
    'email',
    'sms',
    'door_to_door',
    'note',
    'appointment',
    'callback',
];

export const PROSPECTING_ACTION_STATUS = [
    'planned',
    'done',
    'canceled',
    'failed',
];

export const PROSPECTION_EXCLUSION_REASON = [
    'do_not_contact',
    'already_client',
    'invalid_address',
    'duplicate',
    'other',
];


// ==============================
// EXTERNAL DATA / DPE
// ==============================

export const DPE_SOURCE = [
    'ademe',
    'data_gouv',
    'import',
];

export const DPE_CLASS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
];

export const BUILDING_TYPE = [
    'house',
    'apartment',
    'building',
    'commercial',
    'unknown',
];


// ==============================
// HOTLIST
// ==============================

export const HOTLIST_CONTACT_STATUS = [
    'new',
    'active',
    'to_follow_up',
    'inactive',
    'archived',
];

export const HOTLIST_CONTACT_TYPE = [
    'owner',
    'investor',
    'buyer',
    'seller',
    'partner',
    'notary',
    'broker',
    'artisan',
    'diagnostician',
    'other',
];

export const HOTLIST_CONTACT_SOURCE = [
    'manual',
    'prospection',
    'import',
    'dpe',
    'sci_address',
    'network',
    'referral',
];

export const HOTLIST_INTERACTION_TYPE = [
    'call',
    'email',
    'sms',
    'meeting',
    'note',
    'other',
];

export const HOTLIST_REMINDER_STATUS = [
    'planned',
    'done',
    'canceled',
    'overdue',
];

export const HOTLIST_PRIORITY = [
    'low',
    'medium',
    'high',
    'urgent',
];


// ==============================
// CRM / PROSPECT
// ==============================

export const PROSPECT_STATUS = [
    'new',
    'to_contact',
    'contacted',
    'qualified',
    'appointment',
    'won',
    'lost',
    'archived',
];

export const PROSPECT_PRIORITY = [
    'low',
    'medium',
    'high',
    'urgent',
];

export const PROSPECT_SOURCE = [
    'manual',
    'prospection',
    'hotlist',
    'dpe',
    'import',
];


// ==============================
// COMMUNICATION
// ==============================

export const NOTIFICATION_CHANNEL = [
    'in_app',
    'mail',
];

export const NOTIFICATION_STATUS = [
    'unread',
    'read',
    'archived',
];

export const NOTIFICATION_TYPE = [
    'system',
    'prospection',
    'subscription',
    'security',
    'reminder',
];


// ==============================
// SYSTEM
// ==============================

export const USER_ACTIVITY_TYPE = [
    'login',
    'logout',
    'feature_used',
    'search',
    'export',
];

export const AUDIT_ACTION = [
    'create',
    'update',
    'delete',
    'soft_delete',
    'restore',
    'login',
    'logout',
    'permission_denied',
];