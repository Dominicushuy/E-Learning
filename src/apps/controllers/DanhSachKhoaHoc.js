$(document).ready(function() {
	//Khởi tạo đối tượng danh sách khóa học
	var danhSachKhoaHoc = new DanhSachKhoaHoc();
	//Khởi tạo đối tượng khóa học services;
	var khoaHocService = new KhoaHocService();
	//Khoi tao doi tuong Nguoi Dung services;
	var nguoiDungService = new NguoiDungService();

	LoadDanhSachKhoaHoc();
	function LoadDanhSachKhoaHoc(){
		khoaHocService.LayKhoaHoc()
		.done(function(DSKH){
			danhSachKhoaHoc.DSKH = DSKH;
			LoadTableDSKH(danhSachKhoaHoc.DSKH);
		}).fail(function(kq){

		})
		LayDSGV()
	};
	//Lay DS Giao Vu
	function LayDSGV(){
		nguoiDungService.AjaxLayDanhSachNguoiDung()
		.done(function(DSND){
			//Load DSND len the Select
			var noiDung = '';
			for (var i = 0; i < DSND.length; i++) {
				var nguoiDung = DSND[i];
				if(nguoiDung.MaLoaiNguoiDung ==="GV"){
					noiDung +=`
					<option value="${nguoiDung.TaiKhoan}">${nguoiDung.HoTen}</option>
					`;
				}
			}
			$('#NguoiTao').html(noiDung);

		}).fail(function(error){
			console.log(error);
		})
	}

	//Load DSKH len table
	function LoadTableDSKH(DSKH){
		var noiDung = '';
		for (var i = 0; i < DSKH.length; i++) {
			var khoaHoc = DSKH[i];
			noiDung += `
			<tr class="trKhoaHoc">
			<td><input type="checkbox" class="ckbMaKhoaHoc" value="${khoaHoc.MaKhoaHoc}"/></td>
			<td class="MaKhoaHoc">${khoaHoc.MaKhoaHoc}</td>
			<td class="TenKhoaHoc">${khoaHoc.TenKhoaHoc}</td>
			<td class="MoTa">${khoaHoc.MoTa}</td>
			<td class="LuotXem">${khoaHoc.LuotXem}</td>
			<td class="HinhAnh"><img src="${khoaHoc.HinhAnh}" width="50" height="50"></td>
			<td clas="NguoiTao">${khoaHoc.NguoiTao}</td>
			<td><button class="btn btn-primary btnChinhSua" MaKhoaHoc="${khoaHoc.MaKhoaHoc}">Chỉnh Sửa</button></td>
			<td><button class="btn btn-danger btnXoa" MaKhoaHoc="${khoaHoc.MaKhoaHoc}">Xóa</button></td>
			</tr>
			`;
		}
		$('#tbodyDSKH').html(noiDung);
	};
	//Load lên popup Chỉnh Sửa
	$('body').delegate('.btnChinhSua', 'click', function() {
		$('.txtF').val("");
				//Khóa input Mã Khóa học
		$('#MaKhoaHoc').attr("readonly",true);

		var modalTile = "Chỉnh Sửa Khóa Học";
		var modalFooter = 
		`<button id="btnLuu" class="btn btn-success">Lưu</button>
		<button id="btnDong" class="btn btn-danger">Đóng</button>`;
		$('.modal-title').html(modalTile);
		$('.modal-footer').html(modalFooter);
		//Load phần nội dung lên popup
		var trKhoaHoc = $(this).closest('.trKhoaHoc');
		var MaKhoaHoc = trKhoaHoc.find(".MaKhoaHoc").html().trim();
		var TenKhoaHoc = trKhoaHoc.find(".TenKhoaHoc").html().trim();
		var MoTa = trKhoaHoc.find(".MoTa").html().trim();
		var LuotXem = trKhoaHoc.find(".LuotXem").html().trim();
		var HinhAnh = trKhoaHoc.find("img").attr("src");
		var NguoiTao = trKhoaHoc.find(".NguoiTao").html();

		$("#MaKhoaHoc").val(MaKhoaHoc);
		$("#TenKhoaHoc").val(TenKhoaHoc);
		CKEDITOR.instances["MoTa"].setData(MoTa)
		$("#LuotXem").val(LuotXem);
		$("#HinhAnh").val(HinhAnh);
		$("#NguoiTao").val(NguoiTao);
		$("#btnPopupModal").trigger('click');
	});

	//Load lên Popup Thêm
	$('#btnTaoKhoaHoc').click(OpenPopupModal);

	function OpenPopupModal(){
		$('#btnPopupModal').trigger('click');
		$('.txtF').val('');

		var modalTile = "Thêm Khóa Học";
		var modalFooter = 
		`<button id="btnTaoMoi" class="btn btn-success">Thêm Khóa Học</button>
		<button id="btnDong" class="btn btn-danger">Đóng</button>`;
		$('.modal-title').html(modalTile);
		$('.modal-footer').html(modalFooter);
	}
	$('body').delegate('#btnDong', 'click', function() {
		$('#btnDongForm').trigger('click');
	});

	//Luu Cap Nhat Khoa Hoc
	$('body').delegate('#btnLuu', 'click', function() {
		//Lấy thông tin người dùng cập nhật
		var MaKhoaHoc = $('#MaKhoaHoc').val();
		var TenKhoaHoc = $("#TenKhoaHoc").val();
		var MoTa = CKEDITOR.instances["MoTa"].getData();
		var LuotXem = $("#LuotXem").val();
		var TenKhoaHoc = $("#TenKhoaHoc").val();
		var HinhAnh = $("#HinhAnh").val();
		var NguoiTao = $('#NguoiTao').val();

		var khoaHoc = new KhoaHoc(MaKhoaHoc,TenKhoaHoc,MoTa,HinhAnh,LuotXem,NguoiTao);

		khoaHocService.CapNhatKhoaHoc(khoaHoc).done(function(result){
			console.log(result);
			window.location.reload();
		}).fail(function(error){
			console.log(error);
		});

		// mở khóa input Mã Khóa học
		$('#MaKhoaHoc').attr("readonly",false);
	});

	//Tạo mới khóa học
	$('body').delegate('#btnTaoMoi', 'click', function(){
		//Lấy thông tin người dùng nhập vào
		var MaKhoaHoc = $('#MaKhoaHoc').val();
		var TenKhoaHoc = $('#TenKhoaHoc').val();
		var MoTa = $('#MoTa').val();
		var LuotXem = $('#LuotXem').val();
		var HinhAnh = $('#HinhAnh').val();
		var NguoiTao = $('#NguoiTao').val();
		

	//Khởi tạo đối tượng khóa học
		var khoaHoc	= new KhoaHoc(MaKhoaHoc,TenKhoaHoc,MoTa,HinhAnh,LuotXem,NguoiTao);
	//Gọi service để đẩy dữ liệu lên server
		khoaHocService.ThemKhoaHoc(khoaHoc).done(function(result){
			console.log(result);
			window.location.reload();
		}).fail(function(error){
			console.log(error);
		})	

	});
	CKEDITOR.replace( 'MoTa',{
		allowedContent: 'iframe[*]'
	} );

	//Xóa Khóa Học
	$('body').delegate('.btnXoa', 'click', function() {
		var id = $(this).attr("MaKhoaHoc");
		khoaHocService.XoaKhoaHoc(id).done(function(result){
			console.log(result);
			window.location.reload();
			alert("Xóa Thành Công");
		}).fail(function(error){	
			console.log(error);
			alert("Xóa không được");
		})
	});
});