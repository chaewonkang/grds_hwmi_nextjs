<script>
        var pageSlug1 = window.location.pathname.split('/')[2];
        var hwmiApiUrl1 = "https://grds.duckdns.org/api/v1/app/page/?slug=" +pageSlug1;
        fetch(hwmiApiUrl1)
  		.then((response) => response.json())
  		.then((data) => {
            // TODO- image set Data->View.
            console.log("data[0]")
            console.log(data[0])
            console.log("data[0]['image']");
            console.log(data[0]['image']);
            console.log("data[0]['imageAlt']");
            console.log(data[0]['imageAlt']);
            // TODO- point set Data->View.
            console.log("data[0]['point']");
            console.log(data[0]['point']);

            // CON1::: hwmi
            const hwmi = document.getElementById("hwmi");
            const hwmi_module = document.getElementById("hwmi_module");
            // CON1::: wrapper-depth1
            const hwmi_image_wrapper0 = document.getElementById("hwmi_image_wrapper0");
            const hwmi_desc_all_wrapper0 = document.getElementById("hwmi_desc_all_wrapper0");
            // CON
            const hwmi_image0 = document.getElementById("hwmi_image0");
            // CON3::: wrapper-depth3
            const hwmi_desc_wrapper1 = document.getElementById("hwmi_desc_wrapper1");
            const hwmi_desc_wrapper2 = document.getElementById("hwmi_desc_wrapper2");
            const hwmi_desc_wrapper3 = document.getElementById("hwmi_desc_wrapper3");
            // CON4:::
            const hwmi_point_wrapper1 = document.getElementById("hwmi_point_wrapper1");
            const hwmi_point0 = document.getElementById("hwmi_point0");
            const hwmi_point1 = document.getElementById("hwmi_point1");
            // CON5:::
            const hwmi_a_wrapper1 = document.getElementById("hwmi_a_wrapper1");
            const hwmi_a1 = document.getElementById("hwmi_a1");
			const hwmi_desc_image1 = document.getElementById("hwmi_desc_image1");

			// CON6::BUTTON
			const hwmi_outer_button = document.getElementById("hwmi_outer_link");

            if (data[0] == null || data[0] === undefined) {
                hwmi.style.height = 0;
                hwmi.style.backgroundColor = "#ffffff";
                hwmi_module.style.display = "none";
            } else {
                // created_at: "2021-08-11T11:09:07.706681"
                // id: "QLr5IzwObZLnLbdJ"
                // image: "https://grds-https-bucket.s3.amazonaws.com/media/public/blucher09_product.jpg"
                // imageAlt: "product_image"
                // ordering: 4
                // page_areas: [Object] (1)
                // page_descs: [Object, Object, Object, Object, Object, Object] (6)
                // page_images: [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, …] (12)
                // page_links: [Object, Object, Object] (3)
                // point: "50"
                // published_at: "2021-08-11T10:40:05"
                // slug: "product/blucher-08-leather-black"
                // title: "blucher-08-leather-black"
                // type: "PAGE200"
                // updated_at: "2021-08-11T17:21:37.640087"
                // view_count: 0

                hwmi.style.display = "flex";
                hwmi.style.alignItems = "center";
                hwmi.style.justifyContent = "center";

                if (data[0]['image'] == null || data[0]['image'] === undefined)  {
                    hwmi_image_wrapper0.style.height = "0px";
                    hwmi_image_wrapper0.style.display = "none";
                } else {
                    hwmi_image_wrapper0.style.width = "375px";
                    hwmi_image_wrapper0.style.height = "375px";
                    hwmi_desc_all_wrapper0.style.width = "375px";
                    hwmi_desc_all_wrapper0.style.height = "calc(520px - 375px)";
                    hwmi_image0.style.width = "100%";
                    hwmi_image0.style.height = "100%";
                    hwmi_image0.style.objectFit = "cover";
					hwmi_image0.src = data[0]['image'];

                    // hwmi_image0.style.backgroundSize = ""
                }
                if (data[0]['point'] == null || data[0]['point'] === undefined)  {

                } else {
                    // hwmi_point0.innerText = "" + data[0]['point'];
                    // const obj = document.getElementById("value");
                    animateValue(hwmi_point0, 0, data[0]['point'], 5000);
                }

                if (data[0]['title'] == null || data[0]['title'] === undefined)  {

                } else {
					hwmi_a_wrapper1.href = "https://" + data[0]['slug'];
					hwmi_outer_button.href = "https://" + data[0]['slug'];
                    hwmi_a1.innerText = "" + data[0]['title'].toString().replace(/-/g, ' ');
                }

            }

        });


        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }


</script>
