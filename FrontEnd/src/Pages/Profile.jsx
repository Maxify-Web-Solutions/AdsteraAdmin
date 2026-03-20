// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Mail, Shield, User, Save } from "lucide-react";
// import { motion } from "framer-motion";

// export default function AdminProfilePage() {
//     return (
//         <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="w-full max-w-3xl"
//             >
//                 <Card className="rounded-2xl shadow-xl">
//                     <CardHeader className="flex flex-col items-center gap-4">
//                         <Avatar className="h-24 w-24">
//                             <AvatarImage src="https://i.pravatar.cc/150?img=12" />
//                             <AvatarFallback>AD</AvatarFallback>
//                         </Avatar>

//                         <div className="text-center">
//                             <CardTitle className="text-2xl font-bold">Admin Profile</CardTitle>
//                             <p className="text-sm text-gray-500">Manage your admin account information</p>
//                         </div>
//                     </CardHeader>

//                     <CardContent className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium flex items-center gap-2">
//                                     <User size={16} /> Name
//                                 </label>
//                                 <Input placeholder="Admin Name" defaultValue="Super Admin" />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium flex items-center gap-2">
//                                     <Mail size={16} /> Email
//                                 </label>
//                                 <Input placeholder="admin@email.com" defaultValue="admin@email.com" />
//                             </div>
//                         </div>

//                         <div className="space-y-2">
//                             <label className="text-sm font-medium flex items-center gap-2">
//                                 <Shield size={16} /> Role
//                             </label>
//                             <Input value="Administrator" disabled />
//                         </div>

//                         <div className="pt-4 flex justify-end">
//                             <Button className="flex items-center gap-2">
//                                 <Save size={16} /> Save Changes
//                             </Button>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <Card className="rounded-2xl shadow-lg mt-6">
//                     <CardHeader>
//                         <CardTitle className="text-lg">Security</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         <div className="grid md:grid-cols-2 gap-4">
//                             <Input placeholder="New Password" type="password" />
//                             <Input placeholder="Confirm Password" type="password" />
//                         </div>

//                         <Button className="w-full">Update Password</Button>
//                     </CardContent>
//                 </Card>
//             </motion.div>
//         </div>
//     );
// }