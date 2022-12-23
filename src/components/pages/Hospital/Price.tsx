/* eslint-disable react-hooks/rules-of-hooks */
import { Column, useTable } from "react-table";
import { IGetHospitalInfo, IHospitalTreatmentsResponse } from "@/service/types";
import React, { FC, useMemo } from "react";

import { EmptyText } from "@/components/UI/emotion/EmptyText";
import styled from "@emotion/styled";

interface IPriceProps {
  hospitalData: IGetHospitalInfo;
  hospitalTreatmentsData: IHospitalTreatmentsResponse;
}

const Price: FC<IPriceProps> = ({ hospitalData, hospitalTreatmentsData }) => {
  const data = useMemo(() => {
    return hospitalTreatmentsData.results.map((data) => {
      return { ...data, price: `${data.price.toLocaleString()}원` };
    });
  }, [hospitalTreatmentsData]);

  const columns: ReadonlyArray<Column> = useMemo(
    () => [
      {
        Header: "구분",
        accessor: "name",
        width: 100,
      },
      {
        Header: "특이사항",
        accessor: "description",
      },
      {
        Header: "금액",
        accessor: "price",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <PriceWrapper>
      {data.length === 0 ? (
        <EmptyText>등록된 가격 정보가 없습니다.</EmptyText>
      ) : (
        <>
          {hospitalTreatmentsData.price_per_hour ? (
            <div className="price-head">
              <div className="left">60분 치료 시</div>
              <div className="center">
                <span>
                  {Math.floor(
                    hospitalTreatmentsData.price_per_hour
                  ).toLocaleString()}
                  원
                </span>
                <div className="line"></div>
              </div>
              <div className="right">.</div>
            </div>
          ) : null}

          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, j) => (
                    <th {...column.getHeaderProps()} key={j}>
                      <span
                        className={
                          j === 6 ? "red" : j === 5 ? "purple" : "black"
                        }
                      >
                        {column.render("Header")}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell, j) => {
                      return (
                        <td {...cell.getCellProps()} key={j}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ul className="etc">
            <li>
              비급여 진료비용 공개제도에 의해 병원이 직접 건강보험심사평가원에
              제출한 가격정보입니다.
            </li>
            <li>진료시 상황 등에 따라 실제 치료비와는 다를 수 있습니다.</li>
          </ul>
        </>
      )}
    </PriceWrapper>
  );
};

export default Price;

const PriceWrapper = styled.div`
  .price-head {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 2rem;
    text-align: center;
    gap: 0.5rem;

    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30%;
      height: 2.5rem;
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
      background-color: rgba(128, 227, 161, 0.1);
      color: ${(props) => props.theme.colors.green};
      border-radius: 1rem;
    }

    .center {
      font-size: ${(props) => props.theme.fontSizes.xl};
      line-height: ${(props) => props.theme.lineHeights.xl};
      color: ${(props) => props.theme.colors.purple};
      width: 40%;
      font-weight: 700;
      position: relative;

      .line {
        position: absolute;
        border: 0.3rem solid ${(props) => props.theme.colors.purple};
        border-radius: 0.3rem;
        width: 100%;
      }
    }

    .right {
      visibility: hidden;
      width: 30%;
    }
  }

  ul {
    margin-top: 2rem;

    li {
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
      color: ${(props) => props.theme.colors.grey};
      margin: 0 2rem;
      list-style: disc;
    }
  }

  table {
    border: 0;
    width: 100%;

    thead {
      color: ${(props) => props.theme.colors.purple};
      font-size: ${(props) => props.theme.fontSizes.lg};
      line-height: ${(props) => props.theme.lineHeights.lg};

      tr {
        display: flex;
        gap: 2rem;

        th {
          /* width: calc(100% / 3); */
          text-align: start;
          width: 40%;

          &:first-child {
            width: 29%;
          }

          &:last-child {
            width: 31%;
          }
        }
      }
    }

    tbody {
      font-size: ${(props) => props.theme.fontSizes.lg};
      line-height: ${(props) => props.theme.lineHeights.lg};

      tr {
        display: flex;
        gap: 2rem;

        td {
          display: flex;
          width: 40%;
          padding-top: 1.5rem;

          &:first-child {
            width: 29%;
          }

          &:last-child {
            width: 31%;
          }
        }
      }
    }
  }
`;
