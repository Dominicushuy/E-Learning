function ThongTinService () {
}
//Lưu và chuyển thông tin đến trang coursedetail
ThongTinService.prototype.LuuChiTietKhoaHoc = function(){
	$('body').delegate('.XemChiTiet', 'click', function() {
		var maKhoaHoc = $(this).attr('makhoahoc');
	 	localStorage.setItem("MaKhoaHoc", maKhoaHoc);
	 	window.location.href = '../../views/coursedetail/coursedetail.html';
	});
};
//Load dữ liệu lên trang coursedetail
ThongTinService.prototype.LoadChiTietKhoaHoc = function(){
	var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/" + localStorage.getItem("MaKhoaHoc");
	$.ajax({
		url: urlAPI,
		type: 'GET',
	})
	.done(function(kq) {
		$('#img_banner').attr('src',`${kq.HinhAnh}`);
		$('#img_card').attr('src',`${kq.HinhAnh}`);
		$('#TenKhoaHoc1').html(kq.TenKhoaHoc) ;
		$('#TenKhoaHoc2').html(kq.TenKhoaHoc);
		$('#LuotXem').html('Lượt Xem: '+ kq.LuotXem);
		$('#NguoiTao').html(kq.NguoiTao);
		$('#MoTa').html(kq.MoTa);
	})
	.fail(function(kq){
		console.log(kq);
	})	
};

ThongTinService.prototype.TiepTucHoc = function(){
	 $('body').delegate('.TiepTucHoc', 'click', function() {
		var maKhoaHoc = $(this).attr('makhoahoc');
	 	localStorage.setItem("MaKhoaHoc", maKhoaHoc);
	 	window.location.href = '../../coursedetail/coursedetail.html';
	});
};
