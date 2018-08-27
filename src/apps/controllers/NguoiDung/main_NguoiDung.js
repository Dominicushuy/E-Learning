$(document).ready(function() {
//Khởi tạo người dùng service
var nguoiDungService = new NguoiDungService();
nguoiDungService.LayDanhSachNguoiDung();

//Khởi tạo Danh Sách người dùng
var danhSachNguoiDung = new DanhSachNguoiDung();
mangDSND = GetLocal();

//Validation
var validate = new Validation();

//<====================================================Local Storage ================================================>
function LuuStorage(){
        var ItemLocal = JSON.stringify(danhSachNguoiDung.DSND);
        localStorage.setItem('DanhSachND',ItemLocal)
    }

function GetLocal(){
// localStorage.removeItem('DanhSachNguoiDung')
if(KiemTraTonTai()){
    var ItemLocal = JSON.parse(localStorage.getItem('DanhSachND'));
         return ItemLocal;
        }
    return []; 
    }

//Hàm kiểm tra tồn tại
function KiemTraTonTai(){
    var localItem = localStorage.getItem('DanhSachND');
    if(localItem !== null){
        return true;
    }
    return false;
}
//<===================================================Tạo bảng ====================================================>
//Load Danh Sách người dùng ra bảng

function LoadTableDSND(DSND) {
	var DSNDJSon = localStorage.getItem("DanhSachND");
	var DSND = JSON.parse(DSNDJSon);
	var noiDungDSND = '';

	for (var i = 0; i < DSND.length; i++) {
		var nguoiDung = DSND[i];
            if(nguoiDung.Email !== null && nguoiDung.Email.length >15 ){
                nguoiDung.Email = nguoiDung.Email.substr(0,15)+"...";
            }
            if(nguoiDung.HoTen !== null && nguoiDung.HoTen.length >15 ){
                nguoiDung.HoTen = nguoiDung.HoTen.substr(0,15)+"...";
            }
			noiDungDSND+=
			`<tr class="trThongTinNguoiDung">
			<td><input class="CkbXoaNguoiDung" type="checkbox" value="${nguoiDung.TaiKhoan}"></td>
			<td>${nguoiDung.TaiKhoan}</td>
			<td>${nguoiDung.MatKhau}</td>
			<td class="tdHoTen">${nguoiDung.HoTen}</td>
			<td>${nguoiDung.Email}</td>
			<td>${nguoiDung.SoDT}</td>
			<td>${nguoiDung.MaLoaiNguoiDung}</td>
			<td>
			<button class="btn btn-danger btnXoa" data-taikhoan="${nguoiDung.TaiKhoan}"><i class="fa fa-trash"></i></button>
			<button class="btn btn-warning btnCapNhat" data-taikhoan="${nguoiDung.TaiKhoan}"
							data-matkhau="${nguoiDung.MatKhau}"
                            data-hoten="${nguoiDung.HoTen}"
                            data-email="${nguoiDung.Email}"
                            data-sodt="${nguoiDung.SoDT}"
                            data-manguoidung="${nguoiDung.MaLoaiNguoiDung}"
			><i class="fa fa-pencil-square-o"></i></button>
			</td>
			</tr>
			`;	
		}		
	$('#tbodyDSND').html(noiDungDSND);
}

//Load Bảng
LoadDanhSachNguoiDung();
    function LoadDanhSachNguoiDung(){
        nguoiDungService.AjaxLayDanhSachNguoiDung()
        .done(function(DSND){
            danhSachNguoiDung.DSND = DSND;
            LoadTableDSND(danhSachNguoiDung.DSND);
        }).fail(function(kq){
            console.log(kq)
        })

    };
//<================================================Cập nhật người dùng===================================================>
//Hien popup nguoi dung can chinh sua
    $('body').delegate('.btnCapNhat','click',function(){
        $('.modal-title').html("Cập Nhật Người Dùng");
        //Tạo động button ở modal-footer
        var noiDungFooter = `
            <button class="btn btn-success" id="btnSua">Cập Nhật </button>
            <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
        `
        $('.modal-footer').html(noiDungFooter);
        $('#btnModal').trigger('click');
        //Lấy thông tin người dùng
        var tk = $(this).attr('data-taikhoan');
        var mk = $(this).attr('data-matkhau');
        var ht = $(this).attr('data-hoten');
        var email =$(this).attr('data-email');
        var soDT = $(this).attr('data-sodt');
        var maND = $(this).attr('data-manguoidung')
        //gán thông tin người dùng vào các ô input
        $('#TK').val(tk);
        $('#MK').val(mk);
        $('#Name').val(ht);
        $('#Email').val(email);
        $('#SoDT').val(soDT);
        $('#maLoaiND').val(maND);
        //Disable textfield TaiKhoan
        $('#TK').attr("readonly",true);
        $('#maLoaiND').attr("disabled",true);
        $('#TK').css("cursor","not-allowed");
    })

 //Cập Nhật Người dùng 
    $('body').delegate('#btnSua','click',function(){
        var taiKhoan = $('#TK').val();
        var matKhau = $('#MK').val();
        var hoTen = $('#Name').val();
        var Email = $('#Email').val();
        var soDT = $('#SoDT').val();
        var maND = $('#maLoaiND').val();

            if(!isNaN(hoTen)){
                swal({
                    type: 'error',
                    text: 'Vui Lòng thử lại...',
                    title: 'Họ tên chỉ có thể là chữ !',
                    });
                return;   
            }else if (!validate.KiemTraEmail(Email)){
                swal({
                    type: 'error',
                    text: 'Vui Lòng thử lại...',
                    title: 'Hãy nhập đúng định dạng email. Ví dụ: Examp@gmail.com',
                    });
                return;
            }else if (!validate.KiemTraSoDT(soDT)){
                swal({
                    type: 'error',
                    text: 'Vui Lòng thử lại...',
                    title: 'Số điện thoại phải là số và lớn hơn 10 chữ số',
                    });     
                return;
            }else {
                //Tạo đối tượng người dùng mới
                var nguoiDungEdit = new NguoiDung(taiKhoan,matKhau,hoTen,Email,soDT,maND,'');
                nguoiDungService.AjaxCapNhatNguoiDung(nguoiDungEdit)
                .done(function(kq){
                    console.log(kq);
                    swal({
                        position: 'center',
                        type: 'success',
                        title: 'Cập Nhật thành công',
                        showConfirmButton: false,
                        timer: 1000
                        });
                    LuuStorage();
                    LoadDanhSachNguoiDung();
                    setTimeout(function(){window.location.reload()}, 500);
                    setTimeout(function(){window.location.reload()}, 500);
                })
                .fail(function(kq){
                    console.log(kq)
                })
            }
            //Clear dữ liệu input
                $('.modal-body input').val('');
                $('#TK').attr("readonly",false);
                $('#maLoaiND').attr("disabled",false);
                $('#TK').css("cursor","text");
                $('.close').trigger('click'); 
    })

//<================================================Thêm người dùng===================================================>
function ThemNguoiDung(){
	var taiKhoan = $('#TK').val();
    var matKhau = $('#MK').val();
    var hoTen = $('#Name').val();
    var Email = $('#Email').val();
    var soDT = $('#SoDT').val();
    var maND = $('#maLoaiND').val();

        if(taiKhoan === '' || matKhau === '' || hoTen === '' || Email === '' || SoDT === ''){
        swal({
            type: 'error',
            text: 'Vui Lòng thử lại...',
            title: 'Hãy Nhập tất cả các trường !',
            });
        return;   
        }else if (!isNaN(hoTen)) {
            swal({
                type: 'error',
                text: 'Vui Lòng thử lại...',
                title: 'Hãy nhập họ tên là chữ !',
                });                 
            return;
        }else if (!validate.KiemTraEmail(Email)){
            swal({
                type: 'error',
                text: 'Vui Lòng thử lại...',
                title: 'Hãy nhập đúng định dạng email. Ví dụ: Examp@gmail.com',
                });
            return;
        }else if (!validate.KiemTraSoDT(soDT)){
            swal({
                type: 'error',
                text: 'Vui Lòng thử lại...',
                title: 'Số điện thoại phải là số và lớn hơn 10 chữ số',
                });     
            return;
        }else {
            //Tạo đối tượng người dùng mới
            var nguoiDung = new NguoiDung(taiKhoan,matKhau,hoTen,Email,soDT,maND,'');
            //Goi ajax them nguoi dung
            nguoiDungService.AjaxThemNguoiDung(nguoiDung)
            .done(function(kq){
                
                
                    swal(
                    'Thành Công',
                    'Thêm thành công',
                    'success'
                    )
                    danhSachNguoiDung.ThemNguoiDung(nguoidung);
                    LuuStorage();
                    LoadDanhSachNguoiDung();
            })
            .fail(function(kq){
                console.log(kq);
            })
            $('.close').trigger('click');
            $('.modal-body input').val('');
        }   

}
	
	//Hiện popup Thêm ND
	$('#btnThemNguoiDung').click(function(){
		$('.modal-title').html("Thêm Người Dùng");
        //Tạo động button ở modal-footer
        var noiDungFooter = `
            <button class="btn btn-success" id="btnThemND">OK </button>
            <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
        `
        $('.modal-footer').html(noiDungFooter);
        $('#btnModal').trigger('click');
	});
	//Thao táo thêm ND;
	$('body').delegate('#btnThemND', 'click', function() {
		ThemNguoiDung();
	});


//<======================================================Xóa người dùng ==============================================>
//<-----------------------------------------------------Xóa một người dùng----------------------------------------->
$('body').delegate('.btnXoa','click',function(){
        var taiKhoan = $(this).attr('data-taikhoan');
        swal({
            title: 'Bạn muốn xóa?',
            text: "bạn sẽ không thể khôi phục file này!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              //Confirm Xóa
              nguoiDungService.XoaNguoiDung(taiKhoan).done(function(){
                    swal(
                    'Thành Công',
                    'Bạn đã xóa thành công',
                    'success'
                    )
                  console.log('xoa thanh cong');
                  danhSachNguoiDung.XoaMotNguoiDung(taiKhoan);
                  LuuStorage();
                  LoadDanhSachNguoiDung();
                setTimeout(function(){window.location.reload()}, 1000);
                setTimeout(function(){window.location.reload()}, 500);
              }).fail(function(kq){
                console.log(kq)
                swal({
                type: 'error',
                text: 'Vui Lòng thử lại...',
                title: 'không thể xóa người dùng đã ghi danh khóa học !',
                }); 
              })
              
            }
          })        
    });

//<-------------------------------------------------Xóa nhiều người dùn được chọn------------------------------------->
$('#btnXoaNguoiDung').click(function(){
var mangTaiKhoan = [];
var lstTKChecked = $('.CkbXoaNguoiDung');
for (var i = 0; i < lstTKChecked.length; i++) {
        if (lstTKChecked[i].checked) {
            mangTaiKhoan.push(lstTKChecked[i].value);
        }
        if(mangTaiKhoan.length > 0){
            swal({
            title: 'Bạn muốn xóa?',
            text: "bạn sẽ không thể khôi phục file này!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
                })
            .then((willDelete) => {
                if (willDelete) {
                LuuStorage()
                XoaNhieuNguoiDung();
                setTimeout(function(){window.location.reload()}, 1000);
                setTimeout(function(){window.location.reload()}, 1000);
                }
            });   
        }else {
            swal({
                type: 'error',
                text: 'Vui Lòng thử lại...',
                title: 'Vui lòng chọn người dùng cần xóa !',
                }); 
        }
    }  

})

function XoaNhieuNguoiDung () {
    var mangTaiKhoan = [];
    var lstTKChecked = $('.CkbXoaNguoiDung');

    for (var i = 0; i < lstTKChecked.length; i++) {
        if (lstTKChecked[i].checked) {
            mangTaiKhoan.push(lstTKChecked[i].value);
            // Xóa sinh viên trên server
            nguoiDungService.AjaxXoaNguoiDung(lstTKChecked[i].value).done(function(kq){
                LuuStorage();
                swal({
                    position: 'center',
                      type: 'success',
                    title: 'Xóa thành công',
                    showConfirmButton: false,
                    timer: 1000
                    });
            }).fail(function(kq){
                console.log(kq);
                swal({
                type: 'error',
                text: 'Vui Lòng thử lại...',
                title: 'Không thể xóa người dùng đã ghi danh khóa học !',
                }); 

            });
        }
    }
    danhSachNguoiDung.XoaNhieuNguoiDung(mangTaiKhoan);
    LoadDanhSachNguoiDung(); 
}


//<==================================================Tìm kiếm người dùng ==================================================>

//Tìm kiếm theo tên
$('#txtTimKiem').keyup(function() {
    var value = $(this).val().toUpperCase().trim();
    var trTable = $('tr');
    for (var i = 0; i < trTable.length; i++) {
        tdTable = trTable[i].getElementsByTagName('td')[3];
        if(tdTable){
            if(tdTable.innerHTML.toUpperCase().indexOf(value) >-1){
                trTable[i].style.display = "";
            }else {
                trTable[i].style.display = "none";
            }
        }
    }

});


});