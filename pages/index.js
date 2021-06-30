import Head from 'next/head'
import React, { Component, createRef } from 'react';
import { observable, toJS , reaction} from 'mobx';
import { observer,  } from 'mobx-react';
import Router from 'next/router';
import jQuery from "jquery";
import parse from 'html-react-parser';
import moment from 'moment';

import * as Wine from "../axios/Wine"
// import Header from "../components/Header";
import store from "../common/store";

@observer
class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageLoaded : false, 
            activeTabIndex0 : 0,
            activeTabIndex1 : 0,
            activeItemIndex0 : 0,
            activeItemIndex: -1,
            pageData0: [],
            pageData1: [],
            layoutMode: '',

            monthData0: [],
            monthData1: [],
            monthData2: [],
        };
        // this.headerRef = createRef();

        this.onResize = this.onResize.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize() {
        store.layoutMode = this.getLayoutMode();
    }

    getLayoutMode() {
        return window.innerWidth > 992 ? 'desktop' :
            window.innerWidth > 600 ? 'tablet'
            : 'mobile';
    }

    
    componentDidMount() {
        window.$ = window.jQuery = jQuery;
        window.addEventListener('resize', this.onResize);
        store.layoutMode = this.getLayoutMode();

        var currentYear = moment().format('YYYY'); // YYYY-MM-DD HH:mm:ss
        var currentMonth = moment().format('MM'); 
        var prevYear = moment().subtract(1, "month").format('YYYY'); //.format('YYYY'); // YYYY-MM-DD HH:mm:ss
        var prevMonth = moment().subtract(1, "month").format('MM'); 
        var nextYear = moment().add(1, "month").format('YYYY'); //.format('YYYY'); // YYYY-MM-DD HH:mm:ss
        var nextMonth = moment().add(1, "month").format('MM'); 
        if (this.state.pageLoaded == false) {
            this.___apiGetListWithMonth(prevYear + "-" + prevMonth, 0, "N", "");
            this.___apiGetListWithMonth(currentYear + "-" + currentMonth, 1, "N", "");
            this.___apiGetListWithMonth(nextYear + "-" + nextMonth, 2, "N", "");
            this.____getPageData();
        }
    }

    componentDidUpdate() {

    }

    ____getPageData = () => {
        // 서버에서 가져와야하는 기본적인 페이지 자료들
        this.___apiGetItem("");
        setTimeout(()=> {
            this.setState( state => ({ pageLoaded : true }) );
        }
        , 1500);
    }

    ___getRefreshData = () => {
        var currentYear = moment().format('YYYY'); // YYYY-MM-DD HH:mm:ss
        var currentMonth = moment().format('MM'); 
        var prevYear = moment().subtract(1, "month").format('YYYY'); //.format('YYYY'); // YYYY-MM-DD HH:mm:ss
        var prevMonth = moment().subtract(1, "month").format('MM'); 
        var nextYear = moment().add(1, "month").format('YYYY'); //.format('YYYY'); // YYYY-MM-DD HH:mm:ss
        var nextMonth = moment().add(1, "month").format('MM'); 
        this.___apiGetListWithMonth(prevYear + "-" + prevMonth, 0, "N", "");
        this.___apiGetListWithMonth(currentYear + "-" + currentMonth, 1, "N", "");
        this.___apiGetListWithMonth(nextYear + "-" + nextMonth, 2, "N", "");
        this.____getPageData();
    }
    
    ___apiGetList = () => {
        const req = {  query : '' }
        Wine.getList(req)
        .then(res=> { 
            if (res.status < 300){
                this.setState({
                    pageData0 : res.data.results
                })
            } else {
            }
        })
        .then(() => {
        })
        .catch(e => {
        })
    }

    ___apiGetListWithMonth = (paramMonth, paramDataIndex, paramMonthUse, paramMonthStartOrEnd) => {
        const req = {  query : '?published_at=' + paramMonth + "&ordering=-published_at" }
        Wine.getListAll(req)
        .then(res=> { 
            if (res.status < 300){
                if (paramDataIndex == 0) {
                    this.setState({
                        monthData0 : res.data
                    });
                }
                if (paramDataIndex == 1) {
                    if (paramMonthUse == "Y") {
                        if (paramMonthStartOrEnd == "END") {
                            this.setState({
                                monthData1 : res.data,
                                activeItemIndex0 : res.data.length == 0 ? 0 : res.data.length - 1  
                            });
                        } else {
                            this.setState({
                                monthData1 : res.data,
                                activeItemIndex0 : 0
                            });
                        }
                    } else {
                        this.setState({
                            monthData1 : res.data,
                            activeItemIndex0 : 0
                        });
                    }
                }
                if (paramDataIndex == 2) {
                    this.setState({
                        monthData2 : res.data
                    });
                }
            } else {
            }
        })
        .then(() => {
        })
        .catch(e => {
        })
    }
    
    ___apiGetItem = (paramQuery, paramOption) => {

        const req = {  query : paramQuery }
        Wine.getItemAll(req)
        .then(res=> { 
            if (res.status < 300){
                this.setState({
                    pageData1 : paramOption == "append" ?   [...this.state.pageData1, ...res.data] 
                    : Array.from(res.data)
                })
            } else {
            }
        })
        .then(() => {
        })
        .catch(e => {
        })
    }
    
    render() {

        const { 
         } = this.state;
         
        if (store.layoutMode == 'desktop') {
            var divTag = document.getElementById("detail0");
            if (divTag) {
                divTag.style.width = 'calc(30vw)';
                divTag.style.height = 'calc(30vw / 1861 * 2528)';
                divTag.style.top = 'calc(100% / 3065 * 326)';
                divTag.style.left = 'calc(100% / 4904 * 712)';
                divTag.style.marginLeft = '0px';
                divTag.style.marginTop = '0px';
                divTag.style.position = 'absolute';
            }
            var divTag1 = document.getElementById("detail1");
            if (divTag1) {
                divTag1.style.width = 'calc(30vw)';
                divTag1.style.height = 'calc(30vw / 1861 * 2528)';
                divTag1.style.top = 'calc(100% / 3065 * 326)';
                divTag1.style.left = 'calc(100% / 4904 * 712)';
                divTag1.style.marginLeft = '0px';
                divTag1.style.marginTop = '0px';
                divTag1.style.position = 'absolute';
            }
        } else if (store.layoutMode == 'tablet' || store.layoutMode == 'mobile') {
            var divTag = document.getElementById("detail0");
            if (divTag) {
                divTag.style.width = 'calc(100% - 48px)';
                divTag.style.height = '100vw';
                divTag.style.left = '24px';
                divTag.style.marginLeft = '0px';
                divTag.style.marginTop = '0px';
                divTag.style.position = 'absolute';
            }
            var divTag1 = document.getElementById("detail1");
            if (divTag1) {
                divTag1.style.width = 'calc(100% - 48px)';
                divTag1.style.height = '100vw';
                divTag1.style.left = '24px';
                divTag1.style.marginLeft = '0px';
                divTag1.style.marginTop = '0px';
                divTag1.style.position = 'absolute';
            }
        }
        return (
            <>
                {/* PAGE'S STATIC RESOURCE IMPORT. */}
                <Head>
                    {/* LOADER */}
                    {/* PAGE CSS */}
                    {/* PAGE CARD */}
                    <link rel="stylesheet" type="text/css" href="/static/css/common-loader.css" />
                    <link rel="stylesheet" type="text/css" href="/static/css/font.css" />
                    <link rel="stylesheet" type="text/css" href="/static/css/page-index.css" />
                </Head>
                {/* <Header  path={'/'} ref={(ref)=>{this.headerRef = ref}}></Header> */}
                {/* <HeaderSub  path={'/'} ref="header_sub" menu={main_page_menu}></HeaderSub> */}
                {
                    this.state.pageLoaded == true ?
                    <>
                        {this.__viewSection0()}
                    </>
                    :
                    <>
                        <div id="loader"></div>
                    </>
                }



            </>
        )
    }

    __viewItem0 = (item, index) => {
        const { 
            activeTabIndex0,
            activeTabIndex1,
            activeItemIndex,
            pageData0,
            pageData1,
            monthData0,
            monthData1,
            monthData2,
        } = this.state;
        const tab= ['red', 'white','orange','sparkling']
        const itemId = `listitem` + index;
        const itemIdArray = [];

        return (
            <>
                <div 
                    key={itemId}
                    id={itemId}
                    className="list-item cursor_pointer not_draggable"
                    onMouseOver={()=> {
                        var itemTag = document.getElementById(itemId);
                        // itemTag.style.color = '#ea5404';
                        itemTag.style.color = '#ffffff';

                        // var imgTag = document.getElementById("image0");
                        var divTag = document.getElementById("detail0");
                        divTag.style.transition = 'none';
                        divTag.style.opacity = 1;
                        divTag.style.zIndex = 10;
                        if (store.layoutMode == 'desktop') {
                            if (divTag) {
                                divTag.style.width = 'calc(30vw)';
                                divTag.style.height = 'calc(30vw / 1861 * 2528)';
                                divTag.style.top = 'calc(100% / 3065 * 326)';
                                divTag.style.left = 'calc(100% / 4904 * 712)';
                                divTag.style.marginLeft = '0px';
                                divTag.style.marginTop = '0px';
                                divTag.style.position = 'absolute';
                            }
                        } else if (store.layoutMode == 'tablet' || store.layoutMode == 'mobile') {
                            if (divTag) {
                                divTag.style.width = 'calc(100% - 48px)';
                                divTag.style.height = '100vw';
                                divTag.style.left = '24px';
                                divTag.style.marginLeft = '0px';
                                divTag.style.marginTop = '0px';
                                divTag.style.position = 'absolute';
                            }
                        }

                        var imgTag = document.getElementById("image0");
                        imgTag.setAttribute("src", item.image);
                        imgTag.style.width = 'calc(30vw - 48px)';
                        imgTag.style.height = 'calc(30vw - 48px)';
                        imgTag.style.marginLeft = '24px';
                        imgTag.style.opacity = 1;
                        imgTag.style.zIndex = 10;
                        imgTag.style.marginTop = '36px';
                        imgTag.style.objectFit = 'contain';
                        
                        document.getElementById('detail0-label1').innerHTML = item.display_name + "&nbsp;&nbsp;";
                        document.getElementById('detail0-label1').style.display = 'flex';
                        document.getElementById('detail0-label1').style.alignItems = 'flex-end';
                        document.getElementById('detail0-label1').style.justifyContent = 'flex-end';
                        
                        document.getElementById('detail0-label2').innerHTML = "ALC " + item.alc + "&nbsp;";
                        document.getElementById('detail0-label2').style.display = 'flex';
                        document.getElementById('detail0-label2').style.alignItems = 'flex-end';
                        document.getElementById('detail0-label2').style.justifyContent = 'flex-end';
                        
                        document.getElementById('detail0-label3').innerHTML = "FROM. " + "&nbsp;&nbsp;";
                        document.getElementById('detail0-label4').innerHTML = item.from_where + "&nbsp;&nbsp;";
                        document.getElementById('detail0-label5').innerHTML = "VARIETY. " + "&nbsp;";
                        document.getElementById('detail0-label6').innerHTML = item.variety + "&nbsp;&nbsp;";
                        document.getElementById('detail0-label7').innerHTML = "PAIRING. " + "&nbsp;";
                        document.getElementById('detail0-label8').innerHTML = item.pairing + "&nbsp;&nbsp;";
                        document.getElementById('detail0-label9').innerHTML = item.desc;
                    }}
                    onMouseOut={()=> {
                        var itemTag = document.getElementById(itemId);
                        for(var i=0; i<pageData1.length; i++) {
                            const pageTag = `listitem` + i;
                            var pageItemTag = document.getElementById(pageTag);
                            pageItemTag.style.color = '#000000';
                            if (activeItemIndex != i) {
                                pageItemTag.style.color = '#000000';
                            } else {
                                pageItemTag.style.color = '#ea5404';
                            }
                        }
                        if (activeItemIndex != index) {
                            itemTag.style.color = '#000000';
                        } else {
                            itemTag.style.color = '#ea5404';
                        }
                        // var imgTag = document.getElementById("image0");
                        var imgTag = document.getElementById("detail0");
                        // imgTag.style.transition = 'opacity 0.3s';
                        imgTag.style.opacity = 0;
                        imgTag.style.zIndex = -1;
                    }}
                    onClick={()=> {
                        var itemTag = document.getElementById(itemId);
                        itemTag.style.color = '#000000';
                        itemTag.style.color = '#ffffff';

                        // var imgTag = document.getElementById("image0");
                        var imgTag = document.getElementById("detail0");
                        imgTag.style.transition = 'opacity 0.3s';
                        imgTag.style.opacity = 0;
                        imgTag.style.zIndex = -1;
                        setTimeout(() => {

                            // var imgTag = document.getElementById("image0");
                            var divTag = document.getElementById("detail1");
                            divTag.style.opacity = 1;
                            divTag.style.zIndex = 10;
                            
                            if (store.layoutMode == 'desktop') {
                                if (divTag) {
                                    divTag.style.width = 'calc(30vw)';
                                    divTag.style.height = 'calc(30vw / 1861 * 2528)';
                                    divTag.style.top = 'calc(100% / 3065 * 326)';
                                    divTag.style.left = 'calc(100% / 4904 * 712)';
                                    divTag.style.marginLeft = '0px';
                                    divTag.style.marginTop = '0px';
                                    divTag.style.position = 'absolute';
                                }
                            } else if (store.layoutMode == 'tablet' || store.layoutMode == 'mobile') {
                                if (divTag) {
                                    divTag.style.width = 'calc(100% - 48px)';
                                    divTag.style.height = '100vw';
                                    divTag.style.left = '24px';
                                    divTag.style.marginLeft = '0px';
                                    divTag.style.marginTop = '0px';
                                    divTag.style.position = 'absolute';
                                }
                            }
                            

                            var imgTag = document.getElementById("image1");
                            imgTag.setAttribute("src", item.image);
                            imgTag.style.width = 'calc(30vw - 48px)';
                            imgTag.style.height = 'calc(30vw - 48px)';
                            imgTag.style.marginLeft = '24px';
                            imgTag.style.opacity = 1;
                            imgTag.style.zIndex = 10;
                            imgTag.style.marginTop = '36px';
                            imgTag.style.objectFit = 'contain';
                            
                            document.getElementById('detail1-label1').innerHTML = item.display_name + "&nbsp;&nbsp;";
                            document.getElementById('detail1-label1').style.display = 'flex';
                            document.getElementById('detail1-label1').style.alignItems = 'flex-end';
                            document.getElementById('detail1-label1').style.justifyContent = 'flex-end';
                            
                            document.getElementById('detail1-label2').innerHTML = "ALC " + item.alc + "&nbsp;";
                            document.getElementById('detail1-label2').style.display = 'flex';
                            document.getElementById('detail1-label2').style.alignItems = 'flex-end';
                            document.getElementById('detail1-label2').style.justifyContent = 'flex-end';

                            document.getElementById('detail1-label3').innerHTML = "FROM. " + "&nbsp;";
                            document.getElementById('detail1-label4').innerHTML = item.from_where + "&nbsp;&nbsp;";
                            document.getElementById('detail1-label5').innerHTML = "VARIETY. " + "&nbsp;";
                            document.getElementById('detail1-label6').innerHTML = item.variety + "&nbsp;";
                            document.getElementById('detail1-label7').innerHTML = "PAIRING. " + "&nbsp;";
                            document.getElementById('detail1-label8').innerHTML = item.pairing + "&nbsp;&nbsp;";
                            document.getElementById('detail1-label9').innerHTML = item.desc;
                            
                        }, 100);

                        this.setState({
                            activeItemIndex: index
                        })
                        
                    }}
                >
                    <span className="span-wrapper"
                        style={{ 
                            opacity: item.stock == 0 ? 0.3 : 1
                        }}>
                        <span className="list-item-label1">{item.type && item.type != "" ? item.type.toUpperCase() : "" }&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                        <span className="list-item-label2">{item.name}&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                        <span className="list-item-label3">{item.origin && item.origin != "" ? item.origin.toUpperCase() : ""}&nbsp;&nbsp;/&nbsp;{item.year}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="list-item-label4_0">₩</span>
                        <span className="list-item-label4">{item.price}</span>
                    </span>
                    <div className="list-item-stock-0" style={{ background: item.stock == 0 ? '#ffffff': '' }}></div>
                </div>
            </>
        )
    }

    __viewSection0 = () => {
        const { 
            activeTabIndex0,
            activeTabIndex1,
            activeItemIndex0,
            activeItemIndex,
            pageData0,
            pageData1,
            monthData0,
            monthData1,
            monthData2,
        } = this.state;
        const tab= ['red', 'white','orange','sparkling']
        const search_keyword = ['sparkling','white','orange','red', 'rose']
        const show_tab= ['Sparking', 'White & Orange','Red & Rose']
        const social_link=['https://www.instagram.com/tulipthewine/']
        const fontSize1 = 9;
        const fontSize2 = 20;
        const fontSize3 = 12;
        
        return (
            <>
                {/* <div className="background0"> */}
                    <div className="background1">
                        <div className="container0">
                            <div className="div0">
                                <div className="card0">
                                    <img className="not_draggable" 
                                    src="/static/images/card2.png" 
                                    style={{ width:  "100%", height: "100%", zIndex: 99, }} border="0" useMap="#image-map" 
                                    />
                                </div>
                                <map name="image-map">
                                    {/* 934 * 1469 px  300px    * 300 / 934 */}
                                    <area target="_blank" alt="" title="" href="tel:+8227901735" coords={`${315 * 300 / 934 },${1019 * 300 / 934},${57 * 300 / 934 },${977 * 300 / 934 }`} shape="rect"/>
                                    <area target="_blank" alt="" title="" href="mailto:info@tulipthewine.com" coords={`${57 * 300 / 934},${1027 * 300 / 934},${585 * 300 / 934},${1062* 300 / 934}`} shape="rect"/>
                                    <area target="_blank" alt="" title="" href="https://www.instagram.com/tulipthewine" coords={`${58 * 300 / 934},${1211 * 300 / 934},${382 * 300 / 934},${1243 * 300 / 934}`} shape="rect"/>
                                </map>
                                <div id="detail0" className="detail0">
                                    <div className="detail-content">
                                        <img id="image0"/>
                                        <div id="detail0-close0" className="detail-close"
                                            onClick={()=> {
                                                var imgTag = document.getElementById("detail0");
                                                if (imgTag) {
                                                    imgTag.style.transition = 'opacity 0.3s';
                                                    imgTag.style.opacity = 0;
                                                    imgTag.style.zIndex = -1;
                                                }
                                                var imgTag1 = document.getElementById("detail1");
                                                if (imgTag1) {
                                                    imgTag1.style.transition = 'opacity 0.3s';
                                                    imgTag1.style.opacity = 0;
                                                    imgTag1.style.zIndex = -1;
                                                }
                                                if (activeTabIndex0 == 1) {
                                                    for(var i=0; i<pageData1.length; i++) {
                                                        const pageTag = `listitem` + i;
                                                        var pageItemTag = document.getElementById(pageTag);
                                                        if (pageItemTag) {
                                                            pageItemTag.style.color = '#000000';
                                                        }
                                                    }
                                                }
                                                this.setState({
                                                    activeItemIndex: -1
                                                })
                                            }}
                                        />
                                        <span className="detail-row" style={{ marginTop: 24 }} >
                                            <span id="detail0-label1" className="detail-label1"></span>
                                            <span id="detail0-label2" className="detail-label2"></span>
                                        </span>
                                        <span className="detail-row" style={{ marginTop: 9 }} >
                                            <span id="detail0-label3" className="detail-label3"></span>
                                            <span id="detail0-label4" className="detail-label4"></span>
                                            <span id="detail0-label5" className="detail-label5"></span>
                                            <span id="detail0-label6" className="detail-label6"></span>
                                        </span>
                                        <span className="detail-row" style={{ marginTop: 0 }} >
                                            <span id="detail0-label7" className="detail-label7"></span>
                                            <span id="detail0-label8" className="detail-label8"></span>
                                        </span>
                                        <span className="detail-row" style={{ marginTop: 8 }} >
                                            <span id="detail0-label9" className="detail-label9"></span>
                                        </span>
                                    </div>
                                </div>
                                <div id="detail1" className="detail1">
                                    {/* <img id="image1"/> */}
                                    <div className="detail-content">
                                        <img id="image1"/>
                                        <div 
                                            id="detail1-close0" className="detail-close"
                                            onClick={()=> {
                                                var imgTag = document.getElementById("detail0");
                                                if (imgTag) {
                                                    imgTag.style.transition = 'opacity 0.3s';
                                                    imgTag.style.opacity = 0;
                                                    imgTag.style.zIndex = -1;
                                                }
                                                var imgTag1 = document.getElementById("detail1");
                                                if (imgTag1) {
                                                    imgTag1.style.transition = 'opacity 0.3s';
                                                    imgTag1.style.opacity = 0;
                                                    imgTag1.style.zIndex = -1;
                                                }
                                                this.setState({
                                                    activeItemIndex: -1
                                                })
                                            }}
                                        />
                                        <span className="detail-row" style={{ marginTop: 24 }} >
                                            <span id="detail1-label1" className="detail-label1"></span>
                                            <span id="detail1-label2" className="detail-label2"></span>
                                        </span>
                                        <span className="detail-row" style={{ marginTop: 12 }} >
                                            <span>
                                                <span id="detail1-label3" className="detail-label3"></span>
                                                <span id="detail1-label4" className="detail-label4"></span>
                                                <span id="detail1-label5" className="detail-label5"></span>
                                                <span id="detail1-label6" className="detail-label6"></span>
                                            </span>
                                        </span>
                                        <span className="detail-row" style={{ marginTop: 0 }} >
                                            <span>
                                                <span id="detail1-label7" className="detail-label7"></span>
                                                <span id="detail1-label8" className="detail-label8"></span>
                                            </span>
                                        </span>
                                        <span className="detail-row" style={{ marginTop: 8 }} >
                                            <span id="detail1-label9" className="detail-label9"></span>
                                        </span>
                                    </div>
                                </div>
                                <img id="image-close1"/>
                            </div>
                            <div className="div1">
                                <div className="list-wrapper">
                                    <div className="title1" style={{ verticalAlign: 'text-bottom'}}>
                                        <span className="title1-span1 cursor_pointer"
                                            style={{
                                                color : activeTabIndex0 == 0 ? "#ffffff" : "#000000",
                                                position: 'relative'
                                            }}
                                            onClick={()=> {
                                                var imgTag = document.getElementById("detail0");
                                                if (imgTag) {
                                                    imgTag.style.transition = 'opacity 0.3s';
                                                    imgTag.style.opacity = 0;
                                                    imgTag.style.zIndex = -1;
                                                }
                                                var imgTag1 = document.getElementById("detail1");
                                                if (imgTag1) {
                                                    imgTag1.style.transition = 'opacity 0.3s';
                                                    imgTag1.style.opacity = 0;
                                                    imgTag1.style.zIndex = -1;
                                                }
                                                
                                                if (activeTabIndex0 == 1) {
                                                    for(var i=0; i<pageData1.length; i++) {
                                                        const pageTag = `listitem` + i;
                                                        var pageItemTag = document.getElementById(pageTag);
                                                        if (pageItemTag) {
                                                            pageItemTag.style.color = '#000000';
                                                        }
                                                    }
                                                }
                                                this.___getRefreshData();
                                                this.setState({
                                                    activeTabIndex0: 0,
                                                    activeTabIndex1: -1,
                                                    activeItemIndex: -1,
                                                });

                                            }}
                                            >TODAY'S WINE
                                            {
                                                activeTabIndex0 == 0 &&
                                                <img src="/static/images/cursor1.png" style={{ width: 12, height: 12, objectFit: 'contain', position: 'absolute',left: 148, top: -6.2 }}></img>
                                            }
                                            <span style={{ fontSize: 12,  lineHeight: '20px', verticalAlign: 'text-bottom' }}>
                                            {
                                                monthData1[0] && monthData1[0].published_at 
                                                ? "(" + monthData1[0].published_at.substr(5, 5).replace("-", "/") + ")  " 
                                                : ""
                                            }
                                            </span>
                                        </span>
                                        &nbsp;&nbsp;/&nbsp;&nbsp;
                                        <span className="title1-span2 cursor_pointer"
                                            style={{
                                                color : activeTabIndex0 == 1 ? "#ffffff" : "#000000",
                                                position: 'relative'
                                            }}
                                            onClick={()=> {
                                                var imgTag = document.getElementById("detail0");
                                                if (imgTag) {
                                                    imgTag.style.transition = 'opacity 0.3s';
                                                    imgTag.style.opacity = 0;
                                                    imgTag.style.zIndex = -1;
                                                }
                                                var imgTag1 = document.getElementById("detail1");
                                                if (imgTag1) {
                                                    imgTag1.style.transition = 'opacity 0.3s';
                                                    imgTag1.style.opacity = 0;
                                                    imgTag1.style.zIndex = -1;
                                                }

                                                if (activeTabIndex0 == 1) {
                                                    for(var i=0; i<pageData1.length; i++) {
                                                        const pageTag = `listitem` + i;
                                                        var pageItemTag = document.getElementById(pageTag);
                                                        if (pageItemTag) {
                                                            pageItemTag.style.color = '#000000';
                                                        }
                                                    }
                                                }
                                                this.___getRefreshData();
                                                this.setState({
                                                    activeTabIndex0: 1,
                                                    activeTabIndex1: -1,
                                                    activeItemIndex: -1,
                                                })
                                            }}
                                            >LIST ALL STOCK
                                            
                                            {
                                                activeTabIndex0 == 1 &&
                                                <img src="/static/images/cursor1.png" style={{ width: 12, height: 12, objectFit: 'contain', position: 'absolute',left: 170, top: -6.2 }}></img>
                                            }
                                            </span>
                                    </div>
                                    <div className="subtitle1">
                                        <span  
                                            className="cursor_pointer"
                                            style={{ 
                                                    fontFamily: activeTabIndex1 == 0 ? 'Times LT Std' : 'Eina 03' , 
                                                    fontSize: 9, 
                                                    fontWeight: activeTabIndex1 == 0 ? '700' : '500',
                                                    fontStyle:  activeTabIndex1 == 0 ? 'italic' : 'normal'
                                                }}
                                            onClick={()=> {
                                                if (activeTabIndex0 == 0) {
                                                    this.setState({
                                                        activeTabIndex1: 0
                                                    });
                                                    return;
                                                }
                                                if (activeTabIndex0 == 1) {
                                                    this.setState({
                                                        activeTabIndex1: 0
                                                    });
                                                    this.___apiGetItem("?type=" +  search_keyword[0].toUpperCase());
                                                    return;
                                                }
                                            }}
                                        >
                                        {activeTabIndex1 == 0 ?  show_tab[0].toUpperCase() :  show_tab[0].toLowerCase()}
                                        </span>
                                        &nbsp;/&nbsp;
                                        <span  
                                            className="cursor_pointer"
                                            style={{ 
                                                fontFamily: activeTabIndex1 == 1 ? 'Times LT Std' : 'Eina 03' , 
                                                fontSize: 9, 
                                                fontWeight: activeTabIndex1 == 1 ? '700' : '500',
                                                fontStyle:  activeTabIndex1 == 1 ? 'italic' : 'normal'
                                            }}
                                            onClick={()=> {
                                                if (activeTabIndex0 == 0) {
                                                    this.setState({
                                                        activeTabIndex1: 1
                                                    });
                                                    return;
                                                }
                                                if (activeTabIndex0 == 1) {
                                                    this.setState({
                                                        activeTabIndex1: 1
                                                    });
                                                    this.___apiGetItem("?type=" +  search_keyword[1].toUpperCase());
                                                    setTimeout(function() {
                                                        this.___apiGetItem("?type=" +  search_keyword[2].toUpperCase(), "append");
                                                    }, 1000);
                                                      
                                                    return;
                                                }
                                            }}
                                        >
                                        {activeTabIndex1 == 1 ?  show_tab[1].toUpperCase() :  show_tab[1].toLowerCase()}
                                        </span>
                                        &nbsp;/&nbsp;
                                        <span  
                                            className="cursor_pointer"
                                            style={{ 
                                                fontFamily: activeTabIndex1 == 2 ? 'Times LT Std' : 'Eina 03' , 
                                                fontSize: 9, 
                                                fontWeight: activeTabIndex1 == 2 ? '700' : '500'  ,
                                                fontStyle:  activeTabIndex1 == 2 ? 'italic' : 'normal'
                                            }}
                                            onClick={()=> {
                                                if (activeTabIndex0 == 0) {
                                                    this.setState({
                                                        activeTabIndex1: 2
                                                    });
                                                    return;
                                                }
                                                if (activeTabIndex0 == 1) {
                                                    this.setState({
                                                        activeTabIndex1: 2
                                                    });
                                                    this.___apiGetItem("?type=" +  search_keyword[3].toUpperCase());
                                                    setTimeout(function() {
                                                        this.___apiGetItem("?type=" +  search_keyword[4].toUpperCase(), "append");
                                                    }, 1000);
                                                    return;
                                                }
                                            }}
                                        >
                                        {activeTabIndex1 == 2 ?  show_tab[2].toUpperCase() :  show_tab[2].toLowerCase()}
                                        </span>
                                    </div>
                                    <div className="list1">
                                        {/* TODO */}
                                        {
                                            activeTabIndex0 == 0 &&
                                            monthData1 && monthData1 
                                            && monthData1[activeItemIndex0] 
                                            && monthData1[activeItemIndex0].items
                                            && monthData1[activeItemIndex0].items
                                            .filter((item, index)=> {
                                                if (activeTabIndex1 < 0) {
                                                    return item;
                                                }
                                                if (item && item.item_data && item.item_data[0] 
                                                    && (item.item_data[0].type == tab[activeTabIndex1].toUpperCase())
                                                    ) {
                                                    return item;
                                                }
                                            })
                                            .map((item, index)=> {

                                                const itemId = `listitem` + index;
                                                const itemIdArray = [];
                                                return (
                                                    <div 
                                                        key={"wrapper-"+ itemId}
                                                        id={"wrapper-"+ itemId}>
                                                        {item && item.item_data&& item.item_data[0] && this.__viewItem0(item.item_data[0], index)}
                                                    </div>
                                                )
                                            })
                                        }
                                        {
                                            // all stock tab
                                            activeTabIndex0 == 1 &&
                                            pageData1 && pageData1.map((item, index)=> {
                                                const itemId = `listitem` + index;
                                                const itemIdArray = [];
                                                return (
                                                    <div 
                                                        key={"wrapper-"+ itemId}
                                                        id={"wrapper-"+ itemId}>
                                                        {this.__viewItem0(item, index)}
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                    {
                                        activeTabIndex0 == 0 && 
                                            <div className="pagination1">
                                                <span 
                                                className="cursor_pointer" 
                                                 onClick={()=> {
                                                    if (activeItemIndex0 == monthData1.length - 1) {
                                                        if (monthData0.length > 0) {
                                                            var momentData = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD");
                                                            var currentYear = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").format('YYYY'); // YYYY-MM-DD HH:mm:ss
                                                            var currentMonth = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").format('MM'); 
                                                            var prev2Year = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").subtract(2, "month").format('YYYY'); //.format('YYYY'); // YYYY-MM-DD HH:mm:ss
                                                            var prev2Month = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").subtract(2, "month").format('MM'); 
                                                            var prevYear = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").subtract(1, "month").format('YYYY'); //.format('YYYY'); // YYYY-MM-DD HH:mm:ss
                                                            var prevMonth = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").subtract(1, "month").format('MM'); 
                                                            var nextYear = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").add(1, "month").format('YYYY'); //.format('YYYY'); // YYYY-MM-DD HH:mm:ss
                                                            var nextMonth = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").add(1, "month").format('MM'); 
                                                            var next2Year = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").add(2, "month").format('YYYY'); //.format('YYYY'); // YYYY-MM-DD HH:mm:ss
                                                            var next2Month = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").add(2, "month").format('MM'); 

                                                            this.___apiGetListWithMonth(prev2Year + "-" + prev2Month, 0, "N", "");
                                                            this.___apiGetListWithMonth(prevYear + "-" + prevMonth, 1, "Y", "START");
                                                            this.___apiGetListWithMonth(currentYear + "-" + currentMonth, 2, "N", "");

                                                        } else {
                                                            alert("자료가 없습니다.")
                                                            return;
                                                        }
                                                    } else {
                                                        this.setState({
                                                            activeItemIndex0 : this.state.activeItemIndex0 + 1
                                                        });
                                                    }
                                                }}
                                                >
                                                    <img 
                                                        src="/static/images/arrow0.png" 
                                                        style={{ width: 5, height: 'calc(5px / 17 * 27)', objectFit: 'contain', marginRight: 4}} 
                                                    />
                                                    &nbsp;&nbsp;
                                                    PREVIOUS DAY
                                                    {
                                                        activeItemIndex0 == monthData1.length - 1 
                                                        ? (
                                                            monthData0.length > 0 
                                                            ? monthData0[0].published_at 
                                                            && "(" + monthData0[0].published_at.substr(5, 5).replace("-", "/") + ")"  
                                                            : "(NO DATA)"
                                                        )
                                                        :
                                                        ""
                                                    }
                                                    {
                                                        (activeItemIndex0 != monthData1.length - 1 )
                                                        ?
                                                         (
                                                             monthData1[activeItemIndex0 + 1] 
                                                            ?  monthData1[activeItemIndex0 + 1].published_at 
                                                            && "(" + monthData1[activeItemIndex0 + 1].published_at.substr(5, 5).replace("-", "/") + ")"   
                                                            : "(NO DATA)"
                                                            )
                                                            :
                                                            ""
                                                    }
                                                </span>
                                                &nbsp;&nbsp;/&nbsp;&nbsp;
                                                <span 
                                                className="cursor_pointer"
                                                 onClick={()=> {
                                                    if (activeItemIndex0 == 0) {
                                                        if (monthData2.length > 0) {
                                                            var momentData = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD");
                                                            var currentYear = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").format('YYYY'); // YYYY-MM-DD HH:mm:ss
                                                            var currentMonth = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").format('MM'); 
                                                            var prevYear = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").subtract(1, "month").format('YYYY'); //.format('YYYY'); // YYYY-MM-DD HH:mm:ss
                                                            var prevMonth = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").subtract(1, "month").format('MM'); 
                                                            var nextYear = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").add(1, "month").format('YYYY'); //.format('YYYY'); // YYYY-MM-DD HH:mm:ss
                                                            var nextMonth = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").add(1, "month").format('MM'); 
                                                            var next2Year = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").add(2, "month").format('YYYY'); //.format('YYYY'); // YYYY-MM-DD HH:mm:ss
                                                            var next2Month = moment(monthData1[activeItemIndex0].published_at.substr(0, 10), "YYYY-MM-DD").add(2, "month").format('MM'); 
                                                            this.___apiGetListWithMonth(currentYear + "-" + currentMonth, 0, "N", "");
                                                            this.___apiGetListWithMonth(nextYear + "-" + nextMonth, 1, "Y", "END");
                                                            this.___apiGetListWithMonth(next2Year + "-" + next2Month, 2, "N", "");
                                                        } else {
                                                            alert("자료가 없습니다.")
                                                            return;
                                                        }
                                                    } else {
                                                        this.setState({
                                                            activeItemIndex0 : this.state.activeItemIndex0 - 1
                                                        })
                                                    }
                                                    
                                                }}
                                                    >FOLLOWING DAY
                                                    {
                                                        activeItemIndex0 == 0
                                                        ? (monthData2.length > 0 
                                                            ? monthData2[monthData2.length - 1].published_at  
                                                            && "(" + monthData2[monthData2.length - 1].published_at
                                                            .substr(5, 5).replace("-", "/") + ")"  
                                                            : " "
                                                        )
                                                        :
                                                        ""
                                                    }
                                                    {
                                                        activeItemIndex0 != 0 ?
                                                        (
                                                            monthData1[activeItemIndex0 - 1] && monthData1[activeItemIndex0 - 1].published_at 
                                                            ? "(" + monthData1[activeItemIndex0 - 1].published_at.substr(5, 5).replace("-", "/") + ")  " 
                                                            : "(NO DATA)  "
                                                        )
                                                        : 
                                                        ""
                                                    }
                                                    <img 
                                                        src="/static/images/arrow1.png"  
                                                        style={{ width: 5, height: 'calc(5px / 17 * 27)', objectFit: 'contain', marginLeft: 4 }}
                                                    />
                                                </span>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </>
        )
    }

}

export default Index;