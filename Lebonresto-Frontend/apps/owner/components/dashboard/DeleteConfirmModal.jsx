import React from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

export default function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Delete",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    itemName = "",
    confirmText = "Delete",
    cancelText = "Cancel"
}) {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="modal-backdrop fade show"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1050
                }}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{ zIndex: 1055 }}
                onClick={onClose}
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                        {/* Header */}
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10"
                                    style={{ width: '40px', height: '40px' }}
                                >
                                    <FiAlertTriangle size={20} className="text-danger" />
                                </div>
                                {title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Close"
                            />
                        </div>

                        {/* Body */}
                        <div className="modal-body px-4 py-3">
                            <p className="text-muted mb-2">{message}</p>
                            {itemName && (
                                <div className="alert alert-danger alert-dismissible fade show mb-0 d-flex align-items-center gap-2" role="alert" style={{ borderRadius: '0.75rem' }}>
                                    <strong>Item:</strong> {itemName}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="modal-footer border-0 pt-0 px-4 pb-4">
                            <button
                                type="button"
                                className="btn btn-light px-4"
                                onClick={onClose}
                                style={{
                                    borderRadius: '0.75rem',
                                    fontWeight: 600,
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {cancelText}
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger px-4"
                                onClick={handleConfirm}
                                style={{
                                    borderRadius: '0.75rem',
                                    fontWeight: 600,
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
