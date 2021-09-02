export const activeInactive =(data,type,list)=>{

    if(list === 'founding'){
        return data.filter((item) => !item.status ? type === 0 && item :  item.status === type)
    }


    if(list === 'admin'){
        return data.filter((item) => !item.status ? type === false && item :  item.status === type)
    }
    if(list === 'customers'){
        return data.filter((item) => !item.status ?  type === 'INACTIVE' && item :  item.status === type)
    }
    else {
        return data.filter((item) => item.isActive === type)
    }
}