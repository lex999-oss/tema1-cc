
async function getImage()
{
    var response = await fetch("http://localhost:8125/image");
    var data = await response.json();

   var ImgContainer = document.getElementById("image");
                    if (data && ImgContainer) {
                        ImgContainer.innerHTML = '<img src="' + data + '" alt="Car picture from Google">';
                    }
}

async function getMetrics()
{
    var response = await fetch("http://localhost:8125/metrics_api");
    var data: string = await response.text();
    var data_array = data.split(",");
    console.log(data);
    var TextContainer = document.getElementById("metrics");
    if (data && TextContainer) {
        TextContainer.innerHTML = '<p>Average response time for 6(times 10) parallel requests to https://random-data-api.com/api/vehicle/random_vehicle : ' + data_array[0] + ' ms</p>'
                                + '<p>Average response time for 6(times 10) parallel requests to https://random-data-api.com/api/color/random_color : ' + data_array[1] + ' ms</p>';
    }

}