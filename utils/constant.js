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


