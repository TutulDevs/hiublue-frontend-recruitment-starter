import AuthLayout from "@/components/layouts/AuthLayout";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default ProtectedLayout;
