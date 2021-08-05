import React, {useState} from "react";
import {Notes} from "@eachbase/components";
import {FundingSourceSinglePTModifiers} from "./fundingSourceSinglePTModifiers";
import {Images} from "@eachbase/utils";
import {useSelector} from "react-redux";
import {TableCell} from "@material-ui/core";

export const FundingSourceSingleServices = () => {

    let data = useSelector(state => state.fundingSource.fundingSourceServices)


      let newData =  data && data.map((item, index) => {
            const allowed = ['name', 'size', 'min', 'max']
            const filtered = Object.keys(item)
                .filter(key => allowed.includes(key))
                .reduce((obj, key) => {
                    obj[key] = item[key];
                    return obj;
                }, {});
            return (
                filtered
            )
        })


    console.log( newData, 'new' )

    const headerTitles = [
        {
            title: 'Service',
            sortable: true
        },
        {
            title: 'CPT Code',
            sortable: false
        },
        {
            title: 'Unit Size',
            sortable: false
        },
        {
            title: 'Min Unit',
            sortable: false
        },
        {
            title: 'Max Unit',
            sortable: false
        },
        {
            title: 'Action',
            sortable: false
        },
    ];
    const bodyTitles = [
        {
            name: 'name',
        },
        {
            cptCode: 'CPT Code',
        },
        {
            size: 'size',
        }  ,
        {
            min: 'min',
        } ,
        {
            max: 'max',
        },
        // {
        //     title: (<>
        //         <img src={Images.edit} alt="3333" style={{cursor:'pointer'}}/>
        //         <img src={Images.remove} alt="sdasd" style={{marginLeft:16, cursor:'pointer'}}/>
        //     </>),
        // }
    ]
    return (
      <div style={{display:'flex', justifyContent:"space-between",marginTop: 50}}>
       <div style={{marginTop : -32, width: '100%'}}>
           <Notes data={newData} bodyTitles={bodyTitles} headerTitles={headerTitles} defaultStyle={true} />
       </div>
         <FundingSourceSinglePTModifiers />
      </div>
    )
}