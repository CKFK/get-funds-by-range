import { useEffect, useState, useCallback } from 'react'
import { Table } from 'reactstrap'
import DatePicker from "react-datepicker";
import axios from 'axios'
import moment from 'moment'


const FundRanking = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [fundRankingList, setFundRankingList] = useState([]);
    const [fundRankingListForOrder, setFundRankingListForOrder] = useState([]);
    const [selectTimeStatus, setSelectTimeStatus] = useState(false);

    const getListFundRanking = useCallback(async () => {
        try {
            if(fundRankingList.length === 0){
                axios.get('https://fund-ranking-api.herokuapp.com/getRanking').then((res) => {
                    const data = res.data ? res.data.data : []
                    setFundRankingList(data)
                    setFundRankingListForOrder(fundRankingListForOrder)
                })
            }
        } catch (error) {
            console.log(`name ~ error`, error)
        }
    }, [])

    const orderFundRanking = (startDate,endDate) => {
        const newFundRankingList = fundRankingList && fundRankingList.filter(item => {
            let nav_date = new Date(item.nav_date);
            return nav_date >= startDate && nav_date <= endDate 
        }).sort((a,b) => {
            return b.nav_return - a.nav_return
        });
        setFundRankingListForOrder(newFundRankingList)
    }
    

    useEffect(() => {
        if(selectTimeStatus){
            getListFundRanking()
        }
    }, [getListFundRanking,selectTimeStatus])
   
    return (
        <>
            <div className="row d-flex justify-content-center m-3">
                <div className="col-lg-2 col-sm-12">
                    <label>Start date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date)
                            setSelectTimeStatus(true)
                            orderFundRanking(date,endDate)
                        }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>
                <div className="col-lg-2 col-sm-12">
                    <label>End date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => {
                            setEndDate(date)
                            setSelectTimeStatus(true)
                            orderFundRanking(startDate,date)
                        }}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <Table responsive className='table table-striped'>
                        <thead className='text-center'>
                            <tr>
                                <th width="10%">Rank of fund</th>
                                <th>Name</th>
                                <th>Updated date</th>
                                <th>Performance</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {fundRankingListForOrder.length > 0 ? fundRankingListForOrder.map((item, index) =>
                            <tr key={item.mstar_id}>
                                <td className='text-center'>{++index}</td>
                                <td>{item.thailand_fund_code}</td>
                                <td className='text-center'>{moment(item.nav_date).format('D MMM YYYY')}</td>
                                <td>{item.nav_return}</td>
                                <td className='text-right'>{item.nav}</td>
                            </tr>
                        ) : (
                            <tr>
                                <td className='text-center' colSpan={6}>Choose the time range for get fund ranking</td>
                            </tr>
                        )} 
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default FundRanking

