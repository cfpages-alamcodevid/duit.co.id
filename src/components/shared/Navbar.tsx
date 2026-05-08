"use client"

import React from "react"
import { Link } from "react-router-dom"
import { Shield, Menu } from "lucide-react"
import { KnowledgeMegaMenu, ToolsMegaMenu, AcademyMegaMenu, HukumMegaMenu, AhliMegaMenu } from "@/components/ui/MegaMenu"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { AuthNav } from "@/components/auth/AuthNav"

export const Navbar = () => {
  return (
    <nav className="relative z-[60] w-full bg-transparent px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 flex-shrink-0">
        <Shield className="w-7 h-7 text-money-green" />
        <span className="text-lg font-bold tracking-tight text-etched-heading hidden sm:block">
          Duit<span className="text-money-green">.co.id</span>
        </span>
      </Link>

      <div className="hidden lg:flex items-center gap-5">
        <KnowledgeMegaMenu />
        <ToolsMegaMenu />
        <HukumMegaMenu />
        <AcademyMegaMenu />
        <AhliMegaMenu />
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <ThemeToggle />
        <button className="lg:hidden text-heading">
          <Menu className="w-6 h-6" />
        </button>
        <AuthNav />
      </div>
    </nav>
  )
}
