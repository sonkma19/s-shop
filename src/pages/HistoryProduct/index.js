import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import orderApi from '../../api/orderApi'
import LoadingWeb from '../../components/Loading/loadingWeb'
import HistoryItem from './HistoryItem/historyItem'
import './style.css'

const { TabPane } = Tabs

const HistoryProduct = () => {
    const orderChange = useSelector(state => state.order.orderHistory)

    const [historyProduct, setHistoryProduct] = useState([])
    const [loadWeb, setLoadWeb] = useState(true)
    useEffect(() => {
        setLoadWeb(false)
        async function Order() {
            try {
                const res = await orderApi.getOrder()
                setLoadWeb(true)
                setHistoryProduct(res.orders)
            }
            catch (err) {
                setLoadWeb(true)
                console.log(err);
            }
        }
        Order()
    }, [orderChange])

    return (
        <div className="history">
            <div className="container">
                {loadWeb ?
                <Tabs defaultActiveKey="1" >
                <TabPane tab="Tất Cả" key="1">
                    <HistoryItem Product={historyProduct} />
                </TabPane>
                <TabPane tab="Chờ Duyệt" key="2">
                    <HistoryItem Product={historyProduct} />
                </TabPane>
                <TabPane tab="Đã Xét Duyệt" key="3">
                    <div className="empty">
                        <div className="empty__content">
                            <h2 className="empty__title">Không có đơn hàng nào</h2>
                            <Link to="/" className="empty__button">
                                <button className="shopping">Tiếp tục mua sắm</button>
                            </Link>
                        </div>
                    </div>

                </TabPane>
            </Tabs>
            :
            <LoadingWeb />
            }
                
            </div>
        </div>
    )
}

export default HistoryProduct
