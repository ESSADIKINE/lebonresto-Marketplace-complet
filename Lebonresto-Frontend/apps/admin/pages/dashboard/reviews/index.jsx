import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminCard from '../../../components/admin/AdminCard';
import FilterBar from '../../../components/admin/FilterBar';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiMessageSquare, FiTrash2 } from 'react-icons/fi';

export default function DashboardReviews() {
    const reviews = [
        { id: 1, name: "John Doe", restaurant: "Blewr Cafe", date: "Oct 24, 2023", rating: 5, comment: "Amazing food and service! Will definitely come back." },
        { id: 2, name: "Jane Smith", restaurant: "Pasta House", date: "Oct 23, 2023", rating: 4.5, comment: "Great pasta, but the service was a bit slow." },
        { id: 3, name: "Mike Johnson", restaurant: "Burger King", date: "Oct 22, 2023", rating: 3, comment: "Average experience. Food was okay." },
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<BsStarFill key={i} className="text-warning me-1" />);
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                stars.push(<BsStarHalf key={i} className="text-warning me-1" />);
            } else {
                stars.push(<BsStarFill key={i} className="text-muted opacity-25 me-1" />);
            }
        }
        return stars;
    };

    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="Reviews"
                subtitle="Manage customer reviews and feedback."
            />

            <AdminCard>
                <FilterBar
                    onSearch={(val) => console.log(val)}
                    filters={[
                        {
                            options: [
                                { label: 'All Ratings', value: '' },
                                { label: '5 Stars', value: '5' },
                                { label: '4 Stars', value: '4' },
                                { label: '3 Stars', value: '3' }
                            ],
                            onChange: (val) => console.log(val)
                        }
                    ]}
                />

                <div className="d-flex flex-column gap-3">
                    {reviews.map((review) => (
                        <div key={review.id} className="border rounded-3 p-3 bg-white hover-shadow transition-all">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="avatar avatar-md">
                                        <div className="avatar-img rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold">
                                            {review.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold text-dark">{review.name}</h6>
                                        <small className="text-muted">on <span className="text-primary fw-medium">{review.restaurant}</span> • {review.date}</small>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-light border" title="Reply">
                                        <FiMessageSquare />
                                    </button>
                                    <button className="btn btn-sm btn-light border text-danger" title="Delete">
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-2">
                                {renderStars(review.rating)}
                                <span className="ms-2 fw-bold text-dark">{review.rating}</span>
                            </div>

                            <p className="text-muted mb-0 text-sm">
                                "{review.comment}"
                            </p>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination justify-content-center mb-0">
                            <li className="page-item disabled"><a className="page-link border-0 bg-transparent" href="#">Previous</a></li>
                            <li className="page-item active"><a className="page-link border-0 rounded-circle bg-primary text-white mx-1" href="#">1</a></li>
                            <li className="page-item"><a className="page-link border-0 rounded-circle bg-transparent text-dark mx-1" href="#">2</a></li>
                            <li className="page-item"><a className="page-link border-0 bg-transparent" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </AdminCard>
        </div>
    );
}

DashboardReviews.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
