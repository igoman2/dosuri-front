import { css, useTheme } from "@emotion/react";
import Button from "@/components/Button";
import styled from "@emotion/styled";
import { useState } from "react";
import { Field, FormikProvider, useFormik } from "formik";
import DeleteIcon from "@/public/assets/close.png";
import Image from "next/image";

const ToDo = () => {
  const theme = useTheme();
  const [todos, setTodos] = useState<string[]>([]);

  const mainLayout = css`
    position: relative;
    flex: 1 1 0%;
    overflow-y: auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;

  const logoTitle = css`
    font-weight: 700;
    font-size: ${theme.fontSizes.xxxl};
    line-height: ${theme.lineHeights.xxxl};
    min-width: 32rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  `;

  const ListWrapper = styled.div`
    margin-top: 3rem;

    span {
      font-size: ${(props) => props.theme.fontSizes.xl};
      line-height: ${(props) => props.theme.lineHeights.lg};
    }

    ul {
      padding: 1rem;
    }

    li {
      font-size: ${(props) => props.theme.fontSizes.lg};
    }

    .delete-icon {
      padding-left: 0.7rem;
    }
  `;

  const addTodo = async () => {
    const value = formik.values.todo;
    setTodos((current) => [...current, value]);
  };

  const deleteTodo = (event: any, index: number) => {
    setTodos((current) =>
      current.slice(0, index).concat(current.slice(index + 1))
    );
  };

  const formik = useFormik({
    initialValues: {
      todo: "",
    },
    enableReinitialize: true,

    onSubmit: () => {
      addTodo();
    },
  });

  return (
    <main css={mainLayout}>
      <p css={logoTitle}>
        <span>To Do List</span>
      </p>

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <InputWrapper>
            <div className="el">
              <span>To Do</span>
              <Field id="todo" name="todo" placeholder="Type here" />
              <Button text="Add" type="submit" />
            </div>
          </InputWrapper>
        </form>
      </FormikProvider>

      <ListWrapper>
        <span>What to do</span>
        <ul>
          <div>
            {todos.map((item, index) => (
              <li key={`todo-${index}`}>
                - {item}
                <span
                  className="delete-icon"
                  onClick={(e) => deleteTodo(e, index)}
                >
                  <Image
                    src={DeleteIcon}
                    width={10.5}
                    height={10.5}
                    alt="delete"
                  />
                </span>
              </li>
            ))}
          </div>
        </ul>
      </ListWrapper>
    </main>
  );
};

export default ToDo;

const InputWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  .el {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  span {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
  }

  input {
    height: 4.2rem;
    width: 22rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${(props) => props.theme.colors.grey};
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    padding: 1rem;
    outline-color: ${(props) => props.theme.colors.purple};

    &::placeholder {
      color: ${(props) => props.theme.colors.grey};
    }
  }
`;
