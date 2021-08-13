<!--@layout(/layout/basic/layout.html)-->
<!--@js(/drmvsn/js/prd-list.js)-->
<div id="drmvsn-product-detail">
    <div module="product_normalpackage">
        <div class="prd-list-action">
            <div class="prd-sub-nav" id="shop-nav"><div class="current">shop</div></div>
            <div class="prd-col-filter">
                <span class="col-changer active" onclick="toggleCol(this)" data-col="4"><img src="/web/new/imgs/col3@2x.png" alt="" /></span>
                <span class="col-changer" onclick="toggleCol(this)" data-col="2"><img src="/web/new/imgs/col2@2x.png" alt="" /></span>
            </div>
        </div>
        <div module="product_listnormal" class="ec-base-product">
            <!--
                $count = 26
                    ※ 상품진열갯수를 설정하는 변수입니다. 설정하지 않을 경우, 최대 200개의 상품이 진열 됩니다.
                    ※ 진열된 상품이 많으면, 쇼핑몰에 부하가 발생할 수 있습니다.
                $basket_result = /product/add_basket.html
                $basket_option = /product/basket_option.html
            -->
            <ul class="prdList col-4">
                <li id="anchorBoxId_{$product_no}">
                    <div class="thumbnail">
                      <div class="prdImg">
                        <a
                          href="{$link_product_detail}"
                          name="anchorBoxName_{$product_no}"
                          ><img
                            src="{$image_medium}"
                            id="{$image_medium_id}"
                            alt="{$seo_alt_tag}"
                          /></a>
                      </div>
                      <div class="icon">
                        <div class="soldout">{$soldout_icon}</div>
                      </div>
                    </div>
                    <div class="description">
                      <strong class="name"
                        ><a
                          href="{$link_product_detail}"
                          class="{$product_name_display|display}"
                          >{$product_name}</a
                        ></strong
                      >
                      <ul module="product_ListItem" class="spec">
                        <li class="{$item_display|display}">{$item_content}</li>
                        <li class="{$item_display|display}">{$item_content}</li>
                      </ul>
                    </div>
                  </li>
                  <li id="anchorBoxId_{$product_no}">
                    <div class="thumbnail">
                      <div class="prdImg">
                        <a
                          href="{$link_product_detail}"
                          name="anchorBoxName_{$product_no}"
                          ><img
                            src="{$image_medium}"
                            id="{$image_medium_id}"
                            alt="{$seo_alt_tag}"
                          /></a>
                      </div>
                      <div class="icon">
                        <div class="soldout">{$soldout_icon}</div>
                      </div>
                    </div>
                    <div class="description">
                      <strong class="name"
                        ><a
                          href="{$link_product_detail}"
                          class="{$product_name_display|display}"
                          >{$product_name}</a
                        ></strong
                      >
                      <ul module="product_ListItem" class="spec">
                        <li class="{$item_display|display}">{$item_content}</li>
                        <li class="{$item_display|display}">{$item_content}</li>
                      </ul>
                    </div>
                  </li>
            </ul>
        </div>
    </div>

    <div module="product_normalpaging" class="ec-base-paginate">
        <a href="{$param_before}"><img src="//img.echosting.cafe24.com/skin/base/common/btn_page_prev.gif" alt="이전 페이지" /></a>
        <ol>
            <li><a href="{$param}" class="{$param_class}">{$no}</a></li>
            <li><a href="{$param}" class="{$param_class}">{$no}</a></li>
            <li><a href="{$param}" class="{$param_class}">{$no}</a></li>
            <li><a href="{$param}" class="{$param_class}">{$no}</a></li>
            <li><a href="{$param}" class="{$param_class}">{$no}</a></li>
        </ol>
        <a href="{$param_next}"><img src="//img.echosting.cafe24.com/skin/base/common/btn_page_next.gif" alt="다음 페이지" /></a>
    </div>
    </div>
