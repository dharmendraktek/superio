export const removeSpecialChar = (item) => {
    let modifiedString = item.replace(/\*\*/g, '');
    return modifiedString;
}

export const accessRoles = {
    BU_HEAD:104,
    MANAGER:103,
    RECRUITER:105,
    ADMIN:102,
    SUPPORT:109,
    FINANCE:106,
    IND_HR:107,
US_HR:108
}


export const  candidateSearchKey = [
    {name:'Search Any', value:'search-any'},
    {name:'Applicant Id', value:'app-code'},
    {name:'Name', value:'name'},
    {name:'Mobile', value:'mobile'},
    {name:'City', value:'city'},
    {name:'State', value:'state'},
    {name:'Source', value:'source'},
    {name:'Job Title', value:'job-title'},
    {name:'Ownership', value:'owner'},
    {name:'Work Authorization', value:'work-authorization'},
    {name:'Created On', value:'created'},
    {name:'Updated On', value:'updated'},
    {name:'Created By', value:'created_by'},
    {name:'Updated By', value:'updated_by'},
    {name:'Skills', value:'skills'},
]

export const jobDelegationFilterKey =  [
    {id:1,  name:'Search Any', value:'search_any'},
    {id:2,  name:'Contact Manager', value:'contact_manager'},
    {id:3,  name:'Job Title', value:'job_title'},
    // {name:'Assigned Date', value:'created'},
    // {name:'Assigned Today', value:'assigned_today'},
    {id:4,  name:'Assignee Name', value:'assign_full_name'},
    {id:5,  name:'LOB', value:'lob_name'},
    {id:6,  name:'City', value:'city'},
    {id:7,  name:'Status', value:'status'},
    {id:8,  name:'Number of Positions', value:'number_of_positions'},
]

export const jobReportFilterKey = [
    {id:1, name:'Search Any', value:'search_any'},
    {id:2, name:'Job Code', value:'job_code'},
    {id:3, name:'LOB Name', value:'lob_name'},
    {id:4, name:'Client Name', value:'client_name'},
    {id:5, name:'Job Title', value:'job_title'},
    {id:6, name:'Job Type', value:'job_type'},
    {id:7, name:'Job Status', value:'job_status'},
    {id:8, name:'Location', value:'location'},
    {id:9, name:'Priority', value:'Priority'},
]

export const submissionReportFilterKey = [
    {id:1,  name:'Search Any', value:'search_any'},
    {id:2,  name:'Job Code', value:'job_code'},
    {id:3,  name:'Candidate Name', value:'applicant_name'},
    {id:4,  name:'Job Title', value:'job_title'},
    {id:5,  name:'Candidate Email', value:'applicant_email'},
    {id:6,  name:'Candidate Mobile', value:'applicant_mobile'},
    {id:7,  name:'Job Status', value:'job_status'},
    {id:8,  name:'Job Type', value:'job_type'},
    {id:9,  name:'LOB', value:'lob'},
    {id:10, name:'Client', value:'client'},
    {id:11, name:'End Client', value:'endclient'},
    {id:12, name:'Job Location', value:'job_location'},
    {id:13, name:'Account Manager', value:'account_manager'},
    {id:14, name:'Head Account Manager', value:'head_account_manager'},
    {id:15, name:'Delivery Manager', value:'delivery_manager'},
    {id:16, name:'Candidate Source', value:'applicant_source'},
    {id:17, name:'Work Authorization', value:'work_authorization'},
    {id:18, name:'Submitted By', value:'submitted_by'},
    {id:19, name:'Current Status', value:'current_status'},
    {id:20, name:'Current Sub Status', value:'current_substatus'},
    {id:21, name:'Pay Rate', value:'pay_rate'},
] 

export const interviewReportFilterKey = [
    {id:1, name:'Search Any', value:'search_any'},
    {id:2, name:'Interview Round', value:'interview_round'},
    {id:3, name:'Start Time', value:'starttime'},
    {id:4, name:'End Time', value:'endtime'},
    {id:5, name:'Time Zone', value:'timezone'},
    {id:6, name:'Client', value:'client'},
    {id:7, name:'Contact Manager', value:'contact_manager'},
    // {name:'LOB', value:'lob'},
    {id:8, name:'Job Type', value:'job_type'},
    {id:9, name:'LOB', value:'lob'},
    // {name:'Client', value:'client'},
    {id:10,name:'End Client', value:'endclient'},
    {id:11, name:'Reschedule', value:'reschdule'},
    {id:12, name:'Mode', value:'mode'},
    {id:13, name:'Submission ID', value:'submission_id'},
    {id:14, name:'Candidate ID', value:'applicant_id'},
    {id:15, name:'Interview ID', value:'interview_id'},
    {id:16, name:'Job ID', value:'job_id'},
    {id:17, name:'Job Title', value:'job_title'},
    {id:18, name:'Candidate Name', value:'applicant_name'},
    {id:19, name:'Candidate Email', value:'applicant_email'},
    {id:20, name:'Candidate Mobile', value:'applicant_mobile'},
    {id:21, name:'Scheduled By', value:'scheduled_by'},
] 

export const confirmationFilterKeys =  [
    {id:1, name:'Search Any', value:'search_any'},
    {id:2, name:'Job Title', value:'job_title'},
    {id:3, name:'Candidate Name', value:'applicant_name'},
    {id:4, name:'Candidate Email', value:'applicant_email'},
    {id:5, name:'Status', value:'current_status'},
    {id:6, name:'Client', value:'client'},
]


export const  sourceData = [
    {name:'Dice', value:'Dice'},
    {name:'Monster', value:'Monster'},
]

export const LinkendInConnection = [
    {name:'500 +', value:'5'},
    {name:'300 To 499', value:'4'},
    {name:'200 To 299', value:'3'},
    {name:'100 To 199', value:'2'},
    {name:'Below 100', value:'1'},
]

export const LinkendInCreaction = [
    {name:'Above 10 yr Exp', value:'5'},
    {name:'7 To 10', value:'4'},
    {name:'5 To 7', value:'3'},
    {name:'3 To 5', value:'2'},
    {name:'Below 3', value:'1'},
]

export const VendorCopanyStrength = [
    {name:'Above 100', value:'5'},
    {name:'50 To 100', value:'4'},
    {name:'20 To 50', value:'3'},
    // {name:'1 To 3K', value:'2'},
    {name:'Below 20', value:'1'},
]

export const VendorCopanyLinkedInFollower = [
    {name:'Above 10K Follower', value:'5'},
    {name:'5 To 10K', value:'4'},
    {name:'3 To 5K', value:'3'},
    {name:'1 To 3K', value:'2'},
    {name:'Below 1K', value:'1'},
]


export const processOptions = [
    {name:'Add Note', dataToggle:'offcanvas', dataTarget:'#offcanvasRight', ariaControls:'offcanvasRight'},
    // {name:'Send Email', dataToggle:'', dataTarget:'', ariaControls:'' },
    {name:'Add Confirmation', dataToggle:'modal', dataTarget:'#clientSubmissionModal', ariaControls:'clientsubmission'},
    // {name:'Disqualify', dataToggle:'', dataTarget:'', ariaControls:''},
    // {name:'Remove', dataToggle:'', dataTarget:'', ariaControls:''},
    // {name:'Update Status', dataToggle:'', dataTarget:'', ariaControls:''},
    // {name:'Share Job', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Submit To Client', dataToggle:'modal', dataTarget:'#clientSubmissionModal', ariaControls:'clientsubmission'},
    // {name:'Add To Group', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Schedule Interview', dataToggle:'offcanvas', dataTarget:'#interviewSchedule', ariaControls:'offcanvasRight' },
    // {name:'Submit To Other Job', dataToggle:'', dataTarget:'', ariaControls:''},
    // {name:'Add Task', dataToggle:'', dataTarget:'', ariaControls:''},
    // {name:'Export', dataToggle:'', dataTarget:'', ariaControls:''},
    // {name:'Request More Details', dataToggle:'', dataTarget:'', ariaControls:''},
]


export const interviewModes = [
    {name:'Google Hangout'},
    {name:'In-person'},
    {name:'Microsoft Teams'},
    {name:'Skype'},
    {name:'Telephonic'},
    {name:'Webex'},
]

export const interviewRounds = [
    {name:'Client Interview'},
    {name:'L1 Interview'},
    {name:'L2 Interview'},
]

export const timeType = [
    {name:'Minutes', value:'minutes'},
    {name:'Days', value:'days'},
]

export const minutesType = [
    {name:'15'},
    {name:'30'},
    {name:'45'},
    {name:'60'},
    {name:'75'},
    {name:'90'},
    {name:'105'},
    {name:'120'},
    {name:'180'},
]