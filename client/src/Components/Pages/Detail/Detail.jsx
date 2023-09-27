import React from 'react'
import DetailCommon from './DetailCommon'
import RecommendItem from './RecommendItem'



export default function Detail() {
    return (
        <div>
            <DetailCommon></DetailCommon>
            <div className='container mb-5'>
                <div className='row'>
                    <RecommendItem></RecommendItem>
                    <RecommendItem></RecommendItem>
                    <RecommendItem></RecommendItem>
                    <RecommendItem></RecommendItem>
                </div>
            </div>
        </div>
    )
}
