


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
