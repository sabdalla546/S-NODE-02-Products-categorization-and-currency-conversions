    const fs=require('fs');
    const getCatNames =(data)=>{
        const CatNames=[];
        data.forEach(element => {
            if(!CatNames.includes(element.category.name)){
                CatNames.push(element.category.name);
            }
        });
        return CatNames;
    }
    const getCatNamesAndId =(data)=>{
        var p = new Set();
        data.forEach(function(element){
            p.add(JSON.stringify(element.category));
        })
        return p;
    }
    
    const filterCat=(catNames,data,catNameAndId)=>{
        const product=[];
        let items=[];
        let catNamesAndIdList=new Array(...catNameAndId);
        let count=0;
        catNames.forEach(element=>{
            items=[];
            data.forEach(item=>{
                if(element == item.category.name){
                    items.push(
                        {
                            'id':item.id,
                            'title':item.title,
                            'price':item.price,
                            'description':item.description
                        }
                    );
                }

            });
            product.push({category:catNamesAndIdList[count],'product':items});
            count+=1;
        })
        
        return product;
    }
    function convertToDoller(data,value){
        let dataParse=Array.from(data);
        dataParse.forEach(element=>{
            element.product.forEach(element=>{
                element.price=(element.price) * value;
            })
        })
        return data;
    }
    async function getData() {
    let value;
    var myHeaders = new Headers();
    myHeaders.append("apikey", "UZgWebNAx6wlPE3DYQx5sKvqZZAoyyfy");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    res= await fetch("https://api.apilayer.com/exchangerates_data/convert?to=EGP&from=USD&amount=5", requestOptions)
    data = await res.json();
    value=data.info.rate;
    return value;
    }; 
    
    (async function getProducts(){
        const response= await fetch('https://api.escuelajs.co/api/v1/products');
        const data=await response.json();
        //console.log(data);
        const catNames= getCatNames(data);
        console.log(catNames)
        const catNameAndId=getCatNamesAndId(data);
        console.log(catNameAndId);
        const result=filterCat(catNames,data,catNameAndId);
        console.log(result);
       (async () => {
        let value=await getData();
        let finalResult=convertToDoller(result,value);
        console.log(finalResult[0]);
        //fs.writeFileSync('finalresult.json',JSON.stringify(finalResult),{'encoding':'utf-8'});
      })();
    })();
