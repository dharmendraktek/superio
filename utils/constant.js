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
    {name:'Add Note', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Send Email', dataToggle:'', dataTarget:'', ariaControls:'' },
    {name:'Add Confirmation', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Disqualify', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Remove', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Update Status', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Share Job', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Submit To Client', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Add To Group', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Schedule Interview', dataToggle:'offcanvas', dataTarget:'#interviewSchedule', ariaControls:'offcanvasRight' },
    {name:'Submit To Other Job', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Add Task', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Export', dataToggle:'', dataTarget:'', ariaControls:''},
    {name:'Request More Details', dataToggle:'', dataTarget:'', ariaControls:''},
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