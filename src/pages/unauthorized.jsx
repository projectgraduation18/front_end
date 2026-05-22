// src/pages/unauthorized.jsx
import { Link } from "react-router-dom";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function UnauthorizedPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] flex items-center justify-center px-4"
    >
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">غير مصرح</h1>
        <p className="text-gray-600 mb-2">
          عذراً، ليس لديك الصلاحية للوصول إلى هذه الصفحة
        </p>
        <p className="text-sm text-gray-500 mb-8">
          هذه الصفحة متاحة فقط للطلاب
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            <Home className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:bg-muted transition"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة للخلف
          </button>
        </div>
      </div>
    </motion.div>
  );
}
