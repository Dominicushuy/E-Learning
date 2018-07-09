function NguoiDungService () {

}
NguoiDungService.prototype.AjaxThemNguoiDung = function(nguoiDung){
	return $.ajax({
		url: ' http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung',
		type: 'POST',
		dataType: 'json',
		data: nguoiDung
	})
};
NguoiDungService.prototype.AjaxLayDanhSachNguoiDung = function(){
	return $.ajax({
		url: 'http://sv.myclass.vn/api/QuanLyTrungTam/danhsachnguoidung',
		type: 'GET',
		dataType: 'json',
	});
};

NguoiDungService.prototype.AjaxXoaNguoiDung = function(taiKhoan){
	return $.ajax({
		url: `http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
		type: 'DELETE',
	})
};
NguoiDungService.prototype.AjaxSuaNguoiDung = function(nguoiDungEdit){
	var nguoiDung = JSON.stringify(nguoiDungEdit)
	return $.ajax({
		url: 'http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung',
		type: 'PUT',
		data:nguoiDung,
		contentType:'application/json'
	});
	
};