


interface ReduxData{
    data:CategoriesProps[]
    error:string
}
interface CategoriesProps{
    
    createdAt:string
    is_active:false
    name:string
    slug:string
    updatedAt:string
    _id:string
}
interface errorRedux {
    msg:string
}


interface loginProps{
    email:string
    password:string
}
interface login{
    name:string
    email:string
    msg:string
}
interface initialStateLogin extends login{
    error:string
    status:'Loading' | 'Fail' | 'Success' | 'Idle'
}