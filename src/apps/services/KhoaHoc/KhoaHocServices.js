function KhoaHocService(){
	
}
KhoaHocService.prototype.LayKhoaHoc = function(){
	return $.ajax({
		url: 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc',
		type: 'GET',
		dataType: 'json'
	});
};

KhoaHocService.prototype.ThemKhoaHoc = function(khoaHoc){
	return $.ajax({
		url: 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc',
		type: 'POST',
		data: khoaHoc,
		dataType: 'json'
	});
};
KhoaHocService.prototype.CapNhatKhoaHoc = function(khoaHoc){
	var urlAPI =  "http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatKhoaHoc";
	var jsonKhoaHoc = JSON.stringify(khoaHoc);
	return $.ajax({
		url: urlAPI,
		type: 'PUT',
		dataType: 'json',
		data:jsonKhoaHoc
	});
};

KhoaHocService.prototype.XoaKhoaHoc = function(id){
	var urlAPI = ` http://sv.myclass.vn/api/QuanLyTrungTam/XoaKhoaHoc/${id}`;
	return $.ajax({
		url: urlAPI,
		type: 'DELETE'
	});
};
KhoaHocService.prototype.LoadChiTietKhoaHoc = function(maKhoaHoc){
	return $.ajax({
		url: `http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/${maKhoaHoc}`,
		type: 'GET',
	});
};	