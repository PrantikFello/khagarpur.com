
"use client";
import CommunityPreviewIterator from "@/my_components/communityGroups/communityPreviewIterator";
import { motion } from "motion/react";

export default function CommunityGroups() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="min-h-screen py-6">
            <div className="text-center">
                <h1 className="text-lg  md:text-3xl font-bold text-secondary">Local Organizations</h1>
            </div>
            <CommunityPreviewIterator />
        </motion.div>
    );
}