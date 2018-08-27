function KhoaHocService(){
	this.LayDanhSachKhoaHoc = function(){
		var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc";
		$.ajax({
			url: urlAPI,
			type: 'GET',
		})
		.done(function(kq) {
			var noiDungDSKH = '';
			for (var i = 0; i < kq.length; i++) {
				var DSKhoaHoc = kq[i];
				noiDungDSKH +=
				`<div class="col-md-3 cardKhoaHoc" style="display:block">
              		<div class="grid1">
                		<div class="view view-first XemChiTiet" makhoahoc='${DSKhoaHoc.MaKhoaHoc}'>
                  		<div class="index_img" style="width:255px;height:180px"><img src="${DSKhoaHoc.HinhAnh}" class="img-responsive img-fluid" alt=""/></div>
                    		<div class="sale">Sale 30%</div>
                    		<div class="mask">
                      			<div class="info"><i class="search"> </i> Xem chi tiết</div>
                        			<ul class="mask_img">
                          				<li class="star"><img src="images/star.png" alt=""/></li>
                          				<li class="set"><img src="images/set.png" alt=""/></li>
                          			<div class="clearfix"> </div>
                        		  </ul>
                      			</div>
                    		</div> 
                    		<i class="home"></i>
                  			<div class="inner_wrap">
                    		<h3>${DSKhoaHoc.TenKhoaHoc}</h3>
                    		<ul class="star1">
                    		<h4 class="green">${DSKhoaHoc.NguoiTao}</h4>
                      			<li><a href="#"> <img src="images/star1.png" alt=""></a></li>
                      			<li class="luotXem">Lượt Xem ${DSKhoaHoc.LuotXem}</li>
                    		</ul>
                  		</div>
                	</div>
              	</div>
				`;					
			}
			$('#DSKhoaHocContent').html(noiDungDSKH);

		})
		.fail(function(kq) {
			console.log(kq);
		})
	}
}

KhoaHocService.prototype.LoadDanhSachKhoaHocDaGhiDanh = function(){
  //lấy thông tin tk từ LS 
  var TKJson = localStorage.getItem("ThongTinTK");
  var thongTinTK = JSON.parse(TKJson);
  var taiKhoan =thongTinTK[0].TaiKhoan;

  //Xư lý Ajax
  var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/LayThongtinKhoaHoc?taikhoan=" + taiKhoan;
    $.ajax({
      url: urlAPI,
      type: 'GET',
    })
    .done(function(kq) {
        var noiDungDSKH ='';
        for (var i = 0; i < kq.length; i++) {
        var DSKhoaHoc = kq[i];
        noiDungDSKH +=
        `<div class="col-md-4 cardKhoaHoc" style="display:block">
                  <div class="grid1">
                    <div class="view view-first TiepTucHoc" makhoahoc='${DSKhoaHoc.MaKhoaHoc}'>
                      <div class="index_img" style="width:303px;height:190px"><img src="../assets/img/img${i}.jpg" class="img-responsive img-fluid" alt=""/></div>
                        <div class="sale">Học tiếp</div>
                        <div class="mask">
                            <div class="info"><i class="search"> </i> Xem chi tiết</div>
                              <ul class="mask_img">
                                  <li class="star"><img src="../../MyCourse/images/star.png" alt=""/></li>
                                  <li class="set"><img src="../../MyCourse/images/set.png" alt=""/></li>
                                <div class="clearfix"> </div>
                              </ul>
                            </div>
                        </div>
                        <div class="inner_wrap">
                        <h3>${DSKhoaHoc.TenKhoaHoc}</h3>
                        <ul class="star1">
                        <h4 class="green">${DSKhoaHoc.GiaoVu}</h4>
                            <li><a href="#"> <img src="../../MyCourse/images/star1.png" alt=""></a></li>
                            <li class="luotXem">Ngày ghi danh ${DSKhoaHoc.NgayGhiDanh}</li>
                        </ul>
                      </div>
                  </div>
                </div>
        `;          
      }
      $('#Mycourse').html(noiDungDSKH);
    })
    .fail(function(kq) {
      
    })
};