/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { CommonTableProps } from "./config/types";
import {
  handleAllCheckboxChange,
  handleCheckboxChange,
} from "./Helpers/handleCheckbox";
import { IoMdEye } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { emptyData } from "../../shared/config/constaints";
import { icons } from "../../shared/libs/Icons";
import LoadingPage from "../LoadingPage/LoadingPage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Image, Trash2 } from "lucide-react";

const CommonTable: FC<CommonTableProps> = ({
  headerData,
  checkedRows,
  setCheckedRows,
  link,
  checkbox,
  productData,
  itemData = [],
  dataLayout,
  btnLink,
  btnValue,
  deleteBtn,
  deleteFn,
  editPageLink,
  modalFunction,
  loading,
  labelDeleteCondition = true,
  labelEditCondition = true,
  deleteBtnCondition = "",
}) => {
  return (
    <div className={`w-full flex flex-col items-center py-4 ${itemData?.length && "pb-20"}`}>
      <Card className="glass-card w-full border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-10">
                <LoadingPage />
              </div>
            ) : itemData?.length > 0 ? (
              <Table className="w-full text-center">
                {/* Header */}
                <TableHeader className="bg-muted/50">
                  <TableRow className="hover:bg-transparent border-b border-white/10">
                    {checkbox && (
                      <TableHead className="w-12 text-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary bg-background/50"
                          checked={checkedRows.length === itemData?.length}
                          onChange={() =>
                            handleAllCheckboxChange(
                              checkedRows,
                              setCheckedRows,
                              itemData,
                              productData
                            )
                          }
                        />
                      </TableHead>
                    )}
                    {headerData?.map((title: string, index: number) => {
                      if (!labelDeleteCondition && title === "Delete") return null;
                      if (!labelEditCondition && title === "Edit") return null;
                      return (
                        <TableHead
                          key={index}
                          className="text-center font-semibold text-muted-foreground uppercase text-xs tracking-wider"
                        >
                          {title}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                </TableHeader>

                {/* Body */}
                <TableBody>
                  {itemData.map((item: any, index: number) => (
                    <TableRow
                      key={index}
                      className="hover:bg-muted/30 transition-colors border-b border-white/5"
                    >
                      {checkbox && (
                        <TableCell>
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary bg-background/50"
                            checked={checkedRows.includes(item?.id || item?._id)}
                            onChange={() =>
                              handleCheckboxChange(
                                item?.id || item?._id,
                                checkedRows,
                                setCheckedRows
                              )
                            }
                          />
                        </TableCell>
                      )}
                      {dataLayout.map((layout, idx) => (
                        <TableCell key={idx} className="py-4">
                          {layout === "item?.profileImage" || layout === "item?.image" ? (
                            eval(layout) ? (
                              <Avatar className="h-10 w-10 mx-auto border-2 border-background shadow-sm">
                                <AvatarImage src={eval(layout)} alt="Photo" />
                                <AvatarFallback>
                                  <Image className="w-4 h-4" />
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <Avatar className="h-10 w-10 mx-auto">
                                <AvatarFallback>
                                  <Image className="w-4 h-4" />
                                </AvatarFallback>
                              </Avatar>
                            )
                          ) : layout === "role" ? (
                            <Badge
                              variant="outline"
                              className={`capitalize ${item?.role === "super_admin" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                  item?.role === "admin" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                    item?.role === "hr" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                      "bg-gray-500/10 text-gray-500 border-gray-500/20"
                                }`}
                            >
                              {item?.role === "hr" ? item?.role.toUpperCase() : item?.role}
                            </Badge>
                          ) : (
                            <span className={item?.status?.name === "Open" && eval(layout) === "Open" ? "text-destructive font-bold" : ""}>
                              {eval(layout) || (eval(layout) === 0 ? 0 : emptyData)}
                            </span>
                          )}
                        </TableCell>
                      ))}

                      {btnLink && (
                        <TableCell>
                          <NavLink to={`${btnLink}/${item?.id}`}>
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              {btnValue}
                            </Button>
                          </NavLink>
                        </TableCell>
                      )}
                      {deleteBtn && (
                        <TableCell>
                          <div className="flex justify-center items-center">
                            <Button
                              onClick={() => deleteFn(item?.id || item?.userID)}
                              disabled={eval(deleteBtnCondition)}
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                      {link && (
                        <TableCell>
                          <NavLink
                            className="flex justify-center items-center text-muted-foreground hover:text-primary transition-colors"
                            to={`${link}/${item?.id}`}
                          >
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <IoMdEye className="w-4 h-4" />
                            </Button>
                          </NavLink>
                        </TableCell>
                      )}
                      {editPageLink && (
                        <TableCell>
                          <NavLink
                            className="flex justify-center items-center text-muted-foreground hover:text-primary transition-colors"
                            to={`${editPageLink}/${productData
                                ? item?.repair[item?.repair?.length - 1]?.id
                                : item?.id
                              }`}
                          >
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <MdModeEdit className="w-4 h-4" />
                            </Button>
                          </NavLink>
                        </TableCell>
                      )}
                      {modalFunction && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => modalFunction(item?.id)}
                          >
                            {icons.page}
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <div className="bg-muted p-4 rounded-full mb-3">
                  <Image className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-lg font-medium">{emptyData} found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommonTable;
