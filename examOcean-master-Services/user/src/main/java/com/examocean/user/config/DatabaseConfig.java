package com.examocean.user.config;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@ComponentScan
public class DatabaseConfig {
    @Bean
    public DataSource getDataSource() {
        BasicDataSource dataSource = new BasicDataSource();
        // 数据库连接配置
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
//        dataSource.setUrl("jdbc:mysql://localhost:3306/examocean");
        dataSource.setUrl("jdbc:mysql://182.254.141.67:3306/mydb?useUnicode=true&characterEncoding=utf-8&useSSL=false");
        dataSource.setUsername("root");
//        dataSource.setPassword("root");
        dataSource.setPassword("Huawei123");
        return dataSource;
    }

    //事务管理
//    @Bean
//    public DataSourceTransactionManager transactionManager() {
//        return new DataSourceTransactionManager(getDataSource());
//    }
//
//    @Bean(name = "sqlSessionFactory")
//    public SqlSessionFactory sqlSessionFactory() throws Exception {
//        SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
//        sqlSessionFactory.setDataSource(getDataSource());
//        return sqlSessionFactory.getObject();
//    }
}
