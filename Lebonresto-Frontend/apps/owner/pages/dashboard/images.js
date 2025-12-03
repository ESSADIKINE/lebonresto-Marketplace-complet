import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardPageHeader from '../../components/dashboard/DashboardPageHeader';
import DashboardCard from '../../components/dashboard/DashboardCard';
import { FiImage, FiUploadCloud, FiTrash2 } from 'react-icons/fi';

export default function Images() {
    const images = [
        { id: 1, url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", name: "Restaurant Interior" },
        { id: 2, url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", name: "Main Dish" },
        { id: 3, url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", name: "Bar Area" },
        { id: 4, url: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", name: "Dessert" },
    ];

    return (
        <div className="container-fluid">
            <DashboardPageHeader
                title="Image Gallery"
                subtitle="Manage your restaurant images"
            >
                <button className="btn btn-primary d-flex align-items-center gap-2">
                    <FiUploadCloud /> Upload Images
                </button>
            </DashboardPageHeader>

            <DashboardCard>
                <div className="row g-4">
                    {images.map((img) => (
                        <div key={img.id} className="col-xl-3 col-lg-4 col-md-6">
                            <div className="position-relative group">
                                <img
                                    src={img.url}
                                    alt={img.name}
                                    className="img-fluid rounded-3 w-100 object-fit-cover"
                                    style={{ height: '200px' }}
                                />
                                <div className="position-absolute top-0 end-0 p-2">
                                    <button className="btn btn-sm btn-light text-danger shadow-sm rounded-circle p-2">
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <h6 className="fw-semibold mb-0">{img.name}</h6>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="border-2 border-dashed border-secondary border-opacity-25 rounded-3 d-flex flex-column align-items-center justify-content-center h-100 p-4 bg-light" style={{ minHeight: '200px', cursor: 'pointer' }}>
                            <FiUploadCloud size={32} className="text-muted mb-2" />
                            <span className="fw-semibold text-muted">Upload New</span>
                        </div>
                    </div>
                </div>
            </DashboardCard>
        </div>
    );
}

Images.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
