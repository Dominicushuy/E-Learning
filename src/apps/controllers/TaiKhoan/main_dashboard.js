
//<===============================Lấy số liệu Ajax chuyển về LocalStorage==================================>
//Lấy danh sách khóa học
DanhSachKhoaHoc();
function DanhSachKhoaHoc(){
	var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc";
	$.ajax({
		url: urlAPI,
		type: 'GET',
	})
	.done(function(kq) {
		var DSKH = JSON.stringify(kq);
			localStorage.setItem("DanhSachKH",DSKH);
			localStorage.setItem("SoLuongKhoaHoc", kq.length);
	})
	.fail(function(kq) {
		
	})
}

//Lấy danh sách học viên
DanhSachHocvien();
function DanhSachHocvien(){
	 var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachHocvien";
	 $.ajax({
	 	url: urlAPI,
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
}
//Lấy danh sách Người dùng;
DanhSachNguoiDung();
function DanhSachNguoiDung(){
	 var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung";
	 $.ajax({
	 	url: urlAPI,
	 	type: 'GET',
	 })
	 .done(function(kq) {
	 	var DSND = JSON.stringify(kq);
			localStorage.setItem("DanhSachHV",DSND);
			localStorage.setItem("SoLuongNguoiDung", kq.length);
	 })
	 .fail(function(kq) {
	 	console.log(kq);
	 })
}

//Load số liệu 
LoadSoLieu();
function LoadSoLieu(){
	//Lấy dữ liệu từ LocalStorage
	var SLHocVien = localStorage.getItem('SoLuongHocVien');
	var SLNguoiDung = localStorage.getItem('SoLuongNguoiDung');
	var SLKhoaHoc = localStorage.getItem('SoLuongKhoaHoc');

	//Load dữ liệu vào web
	$('#SLNguoiDung').html(SLNguoiDung);
	$('#SLHocVien').html(SLHocVien);
	$('#SLKhoaHoc').html(SLKhoaHoc);
}