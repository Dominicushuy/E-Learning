function GhiDanhService () {
	this.GhiDanh = function(){
		$('#btnGhiDanh').click(function(){
			var maKhoaHoc = localStorage.getItem("MaKhoaHoc");
			var taiKhoan = localStorage.getItem("TaiKhoan");
			var TKJson = JSON.stringify({MaKhoaHoc: maKhoaHoc, TaiKhoan: taiKhoan});

			//Xử lý Ajax
			var urlAPI ='http://sv.myclass.vn/api/QuanLyTrungTam/GhiDanhKhoaHoc';

			$.ajax({
			 	url: urlAPI,
			 	type: 'POST',
			 	contentType: "application/json",
			 	data: TKJson,
			 })
			 .done(function(kq) {
			 	console.log(kq)
			 		swal({
  						position: 'center',
 						type: 'success',
  						title: 'Ghi danh thành công !!!',
  						showConfirmButton: false,
  						timer: 1000
				    });
			 })
			 .fail(function(kq){
			 	console.log(kq)
			 	swal({
  					type: 'error',
  					title: 'Bạn đã ghi khóa học này rồi !!!',
				 });
			 })  
		})
	}
}