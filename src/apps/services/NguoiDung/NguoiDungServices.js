function NguoiDungService () {

}
NguoiDungService.prototype.LayDanhSachNguoiDung = function(){
	var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung";
	$.ajax({
	 	url: urlAPI,
	 	type: 'GET',
	 })
	 .done(function(kq) {
	 	var DSND = JSON.stringify(kq);
	 	localStorage.setItem("DanhSachND", DSND);
	 	localStorage.setItem("SoLuongNguoiDung", kq.length);
	 })
	 .fail(function(kq) {
	 })
};

NguoiDungService.prototype.CapNhatThongTinNguoiDung = function(nguoiDung){
    swal({
          title: 'Bạn có muốn thay đổi?',
          text: "Thay đổi sẽ không thể hoàn lại!",
          type: 'warning',
        showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Cập Nhật'
        }).then((result) => {
        if (result.value) {
        swal(
          'ok!',
          'Cập nhật thành công ',
          'success'
            ) 
           //Xử lý ajax 
          var urlAPI = `http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`;
            $.ajax({
              url: urlAPI,
              type: 'PUT',
              contentType:"application/json",
              data: nguoiDung,
            }).done(function(kq){
              console.log(kq)
              setTimeout(function(){window.location.reload()}, 1000);
            }).fail(function(kq){
            })     
        }
      })  
	
};

NguoiDungService.prototype.XoaNguoiDung = function(id){
    return $.ajax({
        type:'DELETE',
        url:`http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id} `
    })
};

NguoiDungService.prototype.AjaxCapNhatNguoiDung= function(nguoiDungEdit){
    var nguoiDung = JSON.stringify(nguoiDungEdit);
    return $.ajax({
        type:'PUT',
        url:'http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung',
        data: nguoiDung,
        contentType:'application/json'
    })
}

NguoiDungService.prototype.AjaxThemNguoiDung = function(nguoiDung){
    return $.ajax({
        type:'POST',
        url:'http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung',
        dataType:'json',
        data: nguoiDung
    })
}

NguoiDungService.prototype.AjaxXoaNguoiDung = function(id){
    return $.ajax({
      url: `http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id}`,
      type: 'DELETE',
      contentType:"application/json",
    })
    
    
};
NguoiDungService.prototype.AjaxLayDanhSachNguoiDung = function(){
  return $.ajax({
      url: "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
      type: 'GET',
        })
};
    