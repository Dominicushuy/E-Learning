function HocVienService(){
	
}

HocVienService.prototype.LayDanhSachHocVien = function(){
	 $.ajax({
		url: "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachHocvien",
		type: 'GET',
	})
	.done(function(kq) {
		var DSHV = JSON.stringify(kq);
			localStorage.setItem("DanhSachHV",DSHV);
			localStorage.setItem("SoLuongHocVien", kq.length);
	})
	.fail(function(kq) {
		console.log(kq);
	})
};