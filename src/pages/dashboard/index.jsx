import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import dataRecordRes from '../../assets/fake-data/dataRecords.json';
import Popup from '../../components/popup';
import { setUser } from '../../store/actions';
import authContext from '../../store/authContext';
const Dashboard = () => {
    const [state, dispatch] = useContext(authContext);

    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
    const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [dataSelected, setDataSelected] = useState([]);
    const [dataRecords, setDataRecords] = useState([]);

    const isAdmin = state?.user?.role === 'admin';

    const handleLogout = () => {
        dispatch(
            setUser({
                access_token: null,
                role: null,
            }),
        );
        localStorage.clear();
        toast.success('Đăng xuất thành công');
    };

    const handleRowClick = (event, params) => {
        event.stopPropagation();

        setIsPopupAddOpen(true);
        setIsEdit(true);

        const dataSelect = params.row;
        setTitle(dataSelect.title);
        setContent(dataSelect.content);
        setDataSelected([dataSelect.id]);
    };

    const handleAddRecord = () => {
        if (title !== '' && content !== '') {
            dataRecordRes.push({
                id: uuidv4(),
                title: title,
                content: content,
            });
            setIsPopupAddOpen(false);
            toast.success('Thêm ghi chú thành công');
        }
    };

    const handleChangeTitle = (e) => {
        if (title.length <= 200) {
            setTitle(e.target.value);
        } else {
            toast.warning('Tiêu đề đã vượt quá giới hạn ký tự');
        }
    };

    const handleChangeContent = (e) => {
        if (content.length <= 500) {
            setContent(e.target.value);
        } else {
            toast.warning('Nội dung đã vượt quá giới hạn ký tự');
        }
    };

    const handleEditRecord = () => {
        if (title !== '' && content !== '') {
            const dataFilter = dataRecords.find((item) => item.id === dataSelected[0]);
            dataFilter.title = title;
            dataFilter.content = content;
        }
        setIsPopupAddOpen(false);
        toast.success('Sửa ghi chú thành công');
    };

    const handleDeleteRecord = () => {
        const dataFilter = dataRecords.filter((item) => !dataSelected.includes(item.id));
        setDataRecords(dataFilter);
        setIsPopupDeleteOpen(false);
        toast.success('Xóa ghi chú thành công');
    };

    useEffect(() => {
        if (dataRecordRes.length > 0) setDataRecords(dataRecordRes);
    }, [dataRecordRes]);

    const columns = [
        { field: 'stt', headerName: 'STT', width: 90 },
        {
            field: 'title',
            headerName: 'Tiêu đề',
            width: 300,
        },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 300,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className="flex gap-3">
                        <Button
                            onClick={(e) => {
                                handleRowClick(e, params);
                            }}
                            variant="contained"
                        >
                            {isAdmin ? 'Sửa' : 'Xem'}
                        </Button>
                        {isAdmin && (
                            <Button
                                onClick={(e) => {
                                    setIsPopupDeleteOpen(true);
                                    e.stopPropagation();
                                    setDataSelected([params.row.id]);
                                }}
                                variant="contained"
                            >
                                Xóa
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <div className="mt-[50px] w-[800px] mx-auto">
            <div className="text-[20px] text-center py-10">Quản lý ghi chú</div>

            <Box className="flex flex-col gap-3" sx={{ height: 400, width: '100%' }}>
                <div className="flex items-center justify-between">
                    <div className="text-[16px]">Danh sách ghi chú</div>
                    <Button variant="contained" onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </div>
                {isAdmin && (
                    <div className="flex gap-2">
                        <Button
                            variant="contained"
                            color="success"
                            endIcon={<AddIcon />}
                            onClick={() => setIsPopupAddOpen(true)}
                        >
                            Thêm
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            endIcon={<DeleteIcon />}
                            onClick={() => setIsPopupDeleteOpen(true)}
                            disabled={dataSelected.length === 0}
                        >
                            Xóa
                        </Button>
                    </div>
                )}
                <DataGrid
                    rows={dataRecords.map((item, index) => ({ stt: index + 1, ...item }))}
                    columns={columns}
                    onRowSelectionModelChange={(ids) => {
                        setDataSelected(ids);
                    }}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
            <Popup isOpen={isPopupAddOpen} setIsOpen={setIsPopupAddOpen}>
                <div className="min-w-[450px] p-4 flex flex-col gap-3">
                    <div className="text-xl">Thông tin ghi chú</div>
                    <TextField
                        margin="normal"
                        placeholder="Tiêu đề"
                        fullWidth
                        disabled={!isAdmin}
                        value={title}
                        onChange={(e) => handleChangeTitle(e)}
                    />
                    <textarea
                        className="p-4 border border-gray-400 rounded-md focus:outline-[#1976d2]"
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        placeholder="Nhập nội dung ..."
                        disabled={!isAdmin}
                        value={content}
                        onChange={(e) => handleChangeContent(e)}
                    />
                    <div className="flex justify-end gap-3">
                        {isAdmin && (
                            <Button variant="contained" onClick={isEdit ? handleEditRecord : handleAddRecord}>
                                Lưu
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color={isAdmin ? 'error' : 'primary'}
                            onClick={() => setIsPopupAddOpen(false)}
                        >
                            {isAdmin ? 'Đóng' : 'Quay lại'}
                        </Button>
                    </div>
                </div>
            </Popup>
            <Popup isOpen={isPopupDeleteOpen} setIsOpen={setIsPopupDeleteOpen}>
                <div className="min-w-[350px] p-4 flex flex-col gap-3 ">
                    <div className="text-lg font-semibold">Bạn có chắc muốn xóa không?</div>
                    <div className="text-base">Sau khi xóa sẽ không thể khôi phục lại</div>
                    <div className="flex justify-end gap-3 mt-5">
                        <Button variant="contained" color="success" onClick={handleDeleteRecord}>
                            OK
                        </Button>
                        <Button variant="contained" color="error" onClick={() => setIsPopupDeleteOpen(false)}>
                            Đóng
                        </Button>
                    </div>
                </div>
            </Popup>
        </div>
    );
};

export default Dashboard;
