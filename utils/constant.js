export const removeSpecialChar = (item) => {
    let modifiedString = item.replace(/\*\*/g, '');
    return modifiedString;
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
    {name:'Search Any', value:'search_any'},
    {name:'Contact Manager', value:'contact_manager'},
    {name:'Job Title', value:'job_title'},
    // {name:'Assigned Date', value:'created'},
    {name:'Assigned Today', value:'assigned_today'},
    {name:'Assignee Name', value:'assign_full_name'},
    {name:'LOB', value:'lob_name'},
    {name:'City', value:'city'},
    {name:'Status', value:'status'},
    {name:'Number of Positions', value:'number_of_positions'},
]

export const jobReportFilterKey = [
    {name:'Search Any', value:'search_any'},
    {name:'Job Code', value:'job_code'},
    {name:'LOB Name', value:'lob_name'},
    {name:'Client Name', value:'client_name'},
    {name:'Job Title', value:'job_title'},
    {name:'Job Type', value:'job_type'},
    {name:'Job Status', value:'job_status'},
    {name:'Location', value:'location'},
    {name:'Priority', value:'Priority'},
]


export const  sourceData = [
    {name:'Dice', value:'Dice'},
    {name:'Monester', value:'Monester'},
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