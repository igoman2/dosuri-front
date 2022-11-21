import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useMemo } from "react";
import { Column, useTable } from "react-table";
import ReactTable from "react-table";

const TimeTable = () => {
  const data = useMemo(
    () => [
      {
        mon: "10:00 ~ 20:00",
        tue: "10:00 ~ 20:00",
        wed: "10:00 ~ 20:00",
        thu: "10:00 ~ 20:00",
        fri: "10:00 ~ 20:00",
        sat: "10:00 ~ 20:00",
        sun: "휴진",
      },
    ],
    []
  );

  const columns: ReadonlyArray<Column> = useMemo(
    () => [
      {
        Header: "월",
        accessor: "mon",
        width: "50px",
      },
      {
        Header: "화",
        accessor: "tue",
        width: "50px",
      },
      {
        Header: "수",
        accessor: "wed",
        width: "50px",
      },
      {
        Header: "목",
        accessor: "thu",
        width: "50px",
      },
      {
        Header: "금",
        accessor: "fri",
        width: "50px",
      },
      {
        Header: "토",
        accessor: "sat",
        width: "50px",
      },
      {
        Header: "일",
        accessor: "sun",
        width: "50px",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <TableWrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                <th {...column.getHeaderProps()} key={j}>
                  <span
                    className={j === 6 ? "red" : j === 5 ? "purple" : "black"}
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
    </TableWrapper>
  );
};

export default TimeTable;

const TableWrapper = styled.div`
  table {
    display: flex;
    flex-direction: column;
    border: 0;

    thead {
      display: flex;
      width: 100%;

      tr {
        display: flex;
        width: 100%;

        .black {
          color: ${(props) => props.theme.colors.black};
        }

        .red {
          color: ${(props) => props.theme.colors.red};
        }

        .purple {
          color: ${(props) => props.theme.colors.purple};
        }

        th {
          flex-grow: 1;
          border-bottom: ${(props) =>
            `solid 0.1rem ${props.theme.colors.grey}`};

          font-weight: 400;
        }

        td {
          flex-grow: 1;
        }
      }
    }

    tbody {
      tr {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.6rem;

        td {
          width: calc(100% / 7);
          text-align: center;
          vertical-align: center;
        }
      }
    }
  }
`;
